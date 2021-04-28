-- select 
--     name, email_address, username,
--     current_position, current_working_place_name,
--     skills, location, github_username, bio, 
--     website_url, facebook_url, twitter_url, 
--     youtube_channel_url, linkedin_url, instagram_url
-- from users
-- inner join user_profiles on users.id = user_profiles.user_id;

-- update user_profiles set bio = "kjfhgfkg" whr

-- select 
--     concat(substr(p.body, 1, 50), "....") as bodyyy, p.id, p.user_id, p.created_at, 
--     up.github_username, u.name,
--     r.reaction,
--     count(c.id) as comments
--     from posts p
--     inner join user_profiles up on p.user_id = up.user_id
--     inner join users u on u.id = p.user_id
--     left join post_comments c on c.post_id = p.id
--     left join post_reactions r on r.post_id = p.id && r.user_id = 1 
--     group by p.id;

select
    u.name, up.github_username, up.location,
    up.current_working_place_name, up.current_position, up.skills
    from users u
    inner join user_profiles up on u.id = up.user_id;
    height: 75px;
    width: 75px;
    background-color: #7c6dd1;
    position: relative;
    vertical-align: middle;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 30px;
    color: white;
    font-weight: 100;
    letter-spacing: 1px;