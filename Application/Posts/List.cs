using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class List
    {
        public class Query : IRequest<List<Car>>{}

        public class Handler : IRequestHandler<Query, List<Car>>{
            private readonly DataContext context;

            public Handler(DataContext context) => this.context = context;

            public Task<List<Car>> Handle(Query request, CancellationToken cancellationToken){
                return this.context.Cars.ToListAsync();
            }
        }
    }
}