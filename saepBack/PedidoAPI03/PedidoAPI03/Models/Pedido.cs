using System;
using System.Collections.Generic;

namespace PedidoAPI03.Models;

public partial class Pedido
{
    public int Idpedido { get; set; }

    public string Descricao { get; set; } = null!;

    public string Localidade { get; set; } = null!;

    public string Prioridade { get; set; } = null!;

    public string Statuspedido { get; set; } = null!;

    public DateTime Datapedido { get; set; }

    public int IdUsuario { get; set; }

    
}
