namespace AddisEats.Catalog;

public class CustomerClass
{
    public CustomerClass(string name, string phoneNumber)
    {
        Name = name;
        PhoneNumber = phoneNumber;
    }

    public string Name { get; }
    public string PhoneNumber { get; }
}
