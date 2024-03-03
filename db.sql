DROP DATABASE gptnotes;

CREATE DATABASE gptnotes;

USE gptnotes;

CREATE TABLE users(
    user_id           INT unsigned NOT NULL AUTO_INCREMENT,
    username          VARCHAR(150) NOT NULL,
    password          VARCHAR(150) NOT NULL,
    PRIMARY KEY       (user_id)
);

INSERT INTO users (user_id, username, password) VALUES
    ( 1, 'fk798', 'abcd' ),
    ( 2, 'fak176', 'abc' );

CREATE TABLE notes(
    notes_id          INT unsigned NOT NULL AUTO_INCREMENT,
    user_id           INT unsigned NOT NULL,
    content           TEXT,
    PRIMARY KEY       (notes_id),
    FOREIGN KEY       (user_id) REFERENCES users(user_id)
);

INSERT INTO notes (notes_id, user_id, content) VALUES
    ( 1, 1, 'testing this first note' ),
    ( 2, 1, 'a second note' ),
    ( 3, 2, 'someone elses note' );

CREATE TABLE word (
    notes_id                INT unsigned NOT NULL,
    word_index              INT,
    generated_explanation   TEXT,
    links                   TEXT,
    PRIMARY KEY             (notes_id, word_index),
    FOREIGN KEY             (notes_id) REFERENCES notes(notes_id)
);