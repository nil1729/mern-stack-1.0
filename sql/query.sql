select 
    name, email_address, username,
    current_position, current_working_place_name,
    skills, location, github_username, bio, 
    website_url, facebook_url, twitter_url, 
    youtube_channel_url, linkedin_url, instagram_url
from users
inner join user_profiles on users.id = user_profiles.user_id;