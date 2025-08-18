using System;
using Application.Profiles.DTOs;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoService
{
    Task<PhotoUploadResult?> UploadPhoto(IFormFile file);
    Task<DeletionResult> DeletePhoto(string publicId);
}
