CREATE TABLE IF NOT EXISTS parties (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    votes INTEGER, 
    president_name varchar(255), 
    party_name varchar(255)
);

CREATE TABLE IF NOT EXISTS sections (
    id varchar(2) PRIMARY KEY NOT NULL, 
    quantity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    id INTEGER,
    already_voted BOOLEAN NOT NULL,
    section varchar(2),
    PRIMARY KEY (id, section),
    FOREIGN KEY (section) REFERENCES sections(id)
);

CREATE TABLE IF NOT EXISTS votes (
    student_id INTEGER, 
    section varchar(2),  
    party_id INTEGER,
    PRIMARY KEY (student_id, section),
    FOREIGN KEY (student_id, section) REFERENCES students(id, section),
    FOREIGN KEY (section) REFERENCES sections(id),
    FOREIGN KEY (party_id) REFERENCES parties(id) 
);

CREATE TRIGGER IF NOT EXISTS update_votes AFTER INSERT ON votes
BEGIN
    UPDATE students SET already_voted = 1 WHERE students.id = new.student_id AND students.section = new.section;
    UPDATE parties SET votes = votes + 1 WHERE parties.id = new.party_id;
END;

CREATE TRIGGER IF NOT EXISTS increase_section_quantity AFTER INSERT ON students
BEGIN
    UPDATE sections SET quantity = quantity + 1 WHERE sections.id = new.section;
END;

-- select name from sqlite_master where type = 'trigger';