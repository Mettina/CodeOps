# 7.Utility functions module

def add_tax(price, rate=0.15):
    """
    Calculate price including tax.

    Args:
        price (float): Original price (must be >= 0)
        rate (float): Tax rate as decimal (default 0.15 for 15%)

    Returns:
        float: Price including tax

    Raises:
        ValueError: If price or rate is negative
    """
    if price < 0:
        raise ValueError("Price cannot be negative.")
    if rate < 0:
        raise ValueError("Tax rate cannot be negative.")

    return price * (1 + rate)