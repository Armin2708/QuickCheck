CREATE TABLE calendar_events(

    id BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    start_date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    creator_id INT NOT NULL REFERENCES users(id),
    class_id INT

)