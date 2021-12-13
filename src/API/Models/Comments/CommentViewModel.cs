using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Comments
{
    public class CommentViewModel
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public string Date { get; set; }
        public string Username { get; set; }
        public string UserImage { get; set; }
    }
}
