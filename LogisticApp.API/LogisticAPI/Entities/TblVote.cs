using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LogisticAPI.Entities;

[Table("tblVote")]
public class TblVote
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int ShipperId { get; set; }
    public int OrderId { get; set; }
    public int ClientId { get; set; }
    public int Diem { get; set; }
    public string DanhGia { get; set; }
}
