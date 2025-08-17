using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<ActivityDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<ActivityDto>>
    {
        public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            // var activity = await context.Activities
            //             .FirstOrDefaultAsync(x => x.Id == request.Id);

            // var activtyAttendees = await context.ActivityAttendees
            //                     .Include(x => x.User)
            //                     .Where(x => x.ActivityId == request.Id)
            //                     .ToListAsync();
            

            // var activityDto = mapper.Map<ActivityDto>(activity);

            
            // foreach(var attendee in activtyAttendees)
            // {
            //     var profile = mapper.Map<UserProfile>(attendee);

            //     activityDto.Attendees.Add(profile);
            // }
            

            // if (activity == null) return Result<ActivityDto>.Failure("Activity not found", 404);

            // return Result<ActivityDto>.Success(activityDto);
            
            
            var activity = await context.Activities
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);

            if (activity == null) return Result<ActivityDto>.Failure("Activity not found", 404);

            return Result<ActivityDto>.Success(activity);
            
        }
    }
}