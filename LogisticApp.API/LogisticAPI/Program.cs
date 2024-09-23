using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication;
using Logistic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Logistic.Services.Interfaces;
using Logistic.Services.Implements;
using Newtonsoft.Json.Converters;
using Logistic.Common;
using Microsoft.OpenApi.Any;
using Logistic.Constants;
using System.Collections.Immutable;
using Newtonsoft.Json;
using LogisticAPI;
using LogisticAPI.Services.Interfaces;
using LogisticAPI.Services.Implements;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.NumberHandling = JsonNumberHandling.AllowNamedFloatingPointLiterals;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
#region config db
string dbConnection = "Logistic";

// Add services to the container.


string connectionString = builder.Configuration.GetConnectionString(dbConnection);
builder.Services.AddDbContext<LogisticDbContext>(options =>
{
    // Configure Entity Framework Core to use Microsoft SQL Server.
    options.UseSqlServer(connectionString);
});
#endregion

#region config author
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = false,
        ValidateIssuer = false,

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),
        ClockSkew = TimeSpan.Zero // remove delay of token when expire,
    };
});
#endregion
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(Program));

#region config swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Web API"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });

    c.SchemaFilter<EnumSchemaFilter>();
});
#endregion

builder.Services.AddScoped<IUserServices, UserServies>();
builder.Services.AddScoped<ICommuneServices, CommuneServices>();
builder.Services.AddScoped<IDistrictServices, DistrictServices>();
builder.Services.AddScoped<IOrderStatusServices, OrderStatusServices>();
builder.Services.AddScoped<IPriceServices, PriceServices>();
builder.Services.AddScoped<IProvinceServices, ProvinceServices>();
builder.Services.AddScoped<IServiceTypeServices, ServiceTypeServices>();
builder.Services.AddScoped<ITransportTypeServices, TransportTypeServices>();
builder.Services.AddScoped<IWeightTypeServices, WeightTypeServices>();
builder.Services.AddScoped<IVnPayServices, VnPayServices>();
builder.Services.AddScoped<IOrderServices, OrderServices>();
builder.Services.AddScoped<IVoteServices, VoteServices>();


var app = builder.Build();

// Configure the HTTP request pipeline.
/*if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}*/

app.UseCors("AllowAllOrigins");
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
