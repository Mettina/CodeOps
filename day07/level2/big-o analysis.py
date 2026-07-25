def find_max(nums):
    # Handle empty list edge case
    if not nums:
        return None
        
    # Initialize the max variable with the first element
    max_num = nums[0]
    
    # Iterate through the list starting from the second element
    for num in nums[1:]:
        if num > max_num:
            max_num = num
            
    return max_num
