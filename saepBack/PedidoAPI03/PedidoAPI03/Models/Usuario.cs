using System;
using System.Collections.Generic;

namespace PedidoAPI03.Models;

public partial class Usuario
{
    public int Idusuario { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    
}
