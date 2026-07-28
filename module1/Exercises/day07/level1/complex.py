# Comparing Big-O Complexities from Fastest to Slowest

import math

n = 1000

# 1. O(1) - Constant Time (Fastest)
ops_o1 = 1

# 2. O(log n) - Logarithmic Time (Second Fastest)
ops_log_n = math.log2(n)

# 3. O(n) - Linear Time (Third Fastest)
ops_n = n

# 4. O(n²) - Quadratic Time (Slowest)
ops_n_squared = n ** 2

# Printing the comparison ranking
print("Ranking from Fastest to Slowest (n = 1,000,000):")
print(f"1. O(1)       : {ops_o1} operation (Instant)")
print(f"2. O(log n)   : {ops_log_n:.1f} operations (Very Fast)")
print(f"3. O(n)       : {ops_n:,} operations (Fair / Slows down with size)")
print(f"4. O(n²)      : {ops_n_squared:,} operations (Extremely Slow / Crashes on large inputs)")
