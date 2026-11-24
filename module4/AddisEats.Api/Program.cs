using AddisEats.Api.Auth;
using AddisEats.Api.Options;
using AddisEats.Api.Services;
using AddisEats.Api.Data;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

// MINI-PROJECT: menu API
builder.Services.Configure<MenuOptions>(builder.Configuration.GetSection(MenuOptions.SectionName));
builder.Services.AddSingleton<MenuStore>();
builder.Services.AddScoped<IMenuService, MenuService>();
// EXERCISE 1
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// EXERCISE 3 (real clock). Comment out while you run Exercise 4, restore afterwards.
// builder.Services.AddSingleton<IClock, RealClock>();

// EXERCISE 4: leave exactly ONE of these three active
builder.Services.AddTransient<IClock, CapturedClock>();
// builder.Services.AddScoped<IClock, CapturedClock>();
// builder.Services.AddSingleton<IClock, CapturedClock>();
builder.Services.AddScoped<LifetimeProbe>();

// EXERCISE 5: change ONLY this line to switch provider
builder.Services.AddScoped<IPaymentProvider, TeleBirrProvider>();
// builder.Services.AddScoped<IPaymentProvider, CbeBirrProvider>();

// EXERCISE 6
builder.Services.Configure<DeliveryOptions>(builder.Configuration.GetSection(DeliveryOptions.SectionName));

// EXERCISE 7
builder.Services.AddScoped<IReceiptFormatter, ReceiptFormatter>();

// EXERCISE 8
builder.Services.AddAuthentication(DemoAuthHandler.SchemeName)
    .AddScheme<AuthenticationSchemeOptions, DemoAuthHandler>(DemoAuthHandler.SchemeName, _ => { });
builder.Services.AddAuthorization();

// DAY 55
builder.Services.AddSingleton<InMemoryDb>();
builder.Services.AddScoped<IRestaurantService, RestaurantService>();
builder.Services.AddScoped<IRestaurantMenuService, RestaurantMenuService>();
// DAY 55: CORS 
builder.Services.AddCors(options => options.AddPolicy("frontend", policy =>
    policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
          .AllowAnyHeader()
          .AllowAnyMethod()));
var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// EXERCISE 8: swap these two lines for the experiment, then put them back
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();