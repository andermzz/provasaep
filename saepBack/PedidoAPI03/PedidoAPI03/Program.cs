using Microsoft.EntityFrameworkCore;
using PedidoAPI03.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BdPedidos03Context>(o =>
o.UseSqlServer(builder.Configuration.GetConnectionString("conexao")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("acessogeral",
        builder => builder.WithOrigins("http://127.0.0.1:5501") // URL da origem permitida
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("acessogeral");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
