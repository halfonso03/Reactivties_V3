using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public required string UserId { get; set; }
        public required string Predicate { get; set; } = "future";
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper)
            : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Activities.AsQueryable();

            query = request.Predicate switch
            {
                "future" => query.Where(x => x.Date >= DateTime.Today &&  x.Attendees.Any(x => x.UserId == request.UserId)),
                "past" => query.Where(x => x.Date < DateTime.Today &&  x.Attendees.Any(x => x.UserId == request.UserId)),
                "hosting" => query.Where(x => x.Attendees
                        .Any(x => x.UserId == request.UserId && x.IsHost)),                
                _ => query
            };

            var userActivities = await query
                .ProjectTo<UserActivityDto>(mapper.ConfigurationProvider)
                .ToListAsync();
                
            return Result<List<UserActivityDto>>.Success(userActivities);
                
        }
    }
}
