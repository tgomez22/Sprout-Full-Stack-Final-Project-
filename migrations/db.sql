CREATE TABLE users(
    token_id VARCHAR(30) NOT NULL,
    PRIMARY KEY(token_id)
);

CREATE TABLE plants(
    id VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE favList(
    uid VARCHAR(30) NOT NULL,
    pid VARCHAR(30) NOT NULL,
    FOREIGN KEY(uid) REFERENCES users(token_id),
    FOREIGN KEY(pid) REFERENCES plants(id)
);
