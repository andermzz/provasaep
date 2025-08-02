using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PedidoAPI03.Models;

public partial class BdPedidos03Context : DbContext
{
    public BdPedidos03Context()
    {
    }

    public BdPedidos03Context(DbContextOptions<BdPedidos03Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=PC03LAB2847\\SENAI; Database=bd_pedidos03; User Id=sa; Password=senai.123; TrustServerCertificate=true ");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Idpedido);

            entity.ToTable("pedido");

            entity.Property(e => e.Idpedido).HasColumnName("idpedido");
            entity.Property(e => e.Datapedido).HasColumnName("datapedido");
            entity.Property(e => e.Descricao)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("descricao");
            entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");
            entity.Property(e => e.Localidade)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("localidade");
            entity.Property(e => e.Prioridade)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("prioridade");
            entity.Property(e => e.Statuspedido)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("statuspedido");

        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Idusuario);

            entity.ToTable("usuario");

            entity.Property(e => e.Idusuario).HasColumnName("idusuario");
            entity.Property(e => e.Email)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Nome)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("nome");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
