import { getPool } from '../db/connectDB.js';

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM student');
    
    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    
    const [rows] = await pool.query('SELECT * FROM student WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
};

// Create new student
export const createStudent = async (req, res) => {
  try {
    const pool = getPool();
    const { name, email, age } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO student (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: {
        id: result.insertId,
        name,
        email,
        age
      }
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
};
