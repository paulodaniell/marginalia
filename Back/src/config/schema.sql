CREATE TABLE users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(200) NOT NULL,
  author VARCHAR(150),
  content LONGTEXT NOT NULL,
  cover_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE annotations (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  book_id CHAR(36) NOT NULL,
  author_id CHAR(36),
  is_ai_generated BOOLEAN DEFAULT FALSE,
  start_offset INT NOT NULL,
  end_offset INT NOT NULL,
  content TEXT NOT NULL,
  parent_id CHAR(36),
  ai_asked_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (parent_id) REFERENCES annotations(id) ON DELETE CASCADE
);

CREATE TABLE likes (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  annotation_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(annotation_id, user_id),
  FOREIGN KEY (annotation_id) REFERENCES annotations(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);