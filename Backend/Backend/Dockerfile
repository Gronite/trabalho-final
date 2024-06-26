FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY ./ReactTrabalhoMain.sln .
COPY ./Backend/Backend/*.csproj ./Backend/Backend/
RUN dotnet restore

COPY . .
WORKDIR /app/Backend/Backend
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/Backend/Backend/out .

EXPOSE 5144
ENTRYPOINT ["dotnet", "Backend.dll"]