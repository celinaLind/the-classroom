# Test Instructions for The Classroom Application

This document provides manual testing instructions to verify all features work correctly.

## Test Case 1: File Upload

1. Open `index.html` in a web browser
2. Click on the upload area
3. Select a text file (.txt or .md)
4. Verify:
   - File name appears as a tag below the upload area
   - "Choose Learning Method" section becomes visible
   - File can be removed by clicking the × button

## Test Case 2: Learning Method Selection

1. After uploading a file, click each learning method button:
   - Visual
   - Auditory
   - Reading/Writing
   - Kinesthetic
2. Verify:
   - Selected button changes color (blue background)
   - "Generate Learning Plan" button becomes enabled
   - Only one method can be selected at a time

## Test Case 3: Learning Plan Generation

1. Upload a file with content that includes headers or topics
2. Select a learning method
3. Click "Generate Learning Plan"
4. Verify:
   - Welcome screen is hidden
   - Learning plan appears on chalkboard
   - Plan shows selected method and strategy
   - Topics are extracted from uploaded content
   - "Start Teaching Session" button is visible

## Test Case 4: Teaching Session - Visual Method

1. Generate a plan with Visual method
2. Click "Start Teaching Session"
3. Verify:
   - Lesson content includes visual learning elements (📊 icon)
   - Content mentions diagrams, mind maps, visualization
   - Progress bar shows current progress
   - Previous button is disabled on first lesson
   - Next/Finish button is enabled

## Test Case 5: Teaching Session - Auditory Method

1. Restart and select Auditory method
2. Generate plan and start teaching
3. Verify:
   - Lesson content includes auditory elements (🎧 icon)
   - Content encourages reading aloud
   - Instructions mention speaking and explaining

## Test Case 6: Teaching Session - Reading/Writing Method

1. Restart and select Reading/Writing method
2. Generate plan and start teaching
3. Verify:
   - Lesson content includes reading focus (📖 icon)
   - Content emphasizes written summaries and notes
   - Writing exercises are included

## Test Case 7: Teaching Session - Kinesthetic Method

1. Restart and select Kinesthetic method
2. Generate plan and start teaching
3. Verify:
   - Lesson content includes interactive practice (✋ icon)
   - Content encourages hands-on activities
   - Real-world application examples are present

## Test Case 8: Lesson Navigation

1. Upload a file with multiple topics
2. Generate a learning plan
3. Start teaching session
4. Test:
   - Click Next to advance lessons
   - Verify progress bar updates
   - Click Previous to go back
   - Verify Previous is disabled on first lesson

## Test Case 9: Session Completion

1. Complete all lessons
2. Click "Finish" on the last lesson
3. Verify:
   - Congratulations message appears (🎉)
   - Success message shows learning method used
   - Encouragement message is displayed

## Test Case 10: Restart Functionality

1. At any point in the session, click "Restart"
2. Verify:
   - Returns to welcome screen
   - Learning method selection is reset
   - Previously uploaded files are still available
   - Generate Learning Plan button is disabled until method is selected again

## Test Case 11: Multiple File Upload

1. Upload multiple files at once
2. Verify:
   - All file names appear as tags
   - Each file can be removed individually
   - Content from all files is used for learning plan

## Test Case 12: Responsive Design

1. Resize browser window to different sizes
2. Verify:
   - Layout adapts to screen size
   - Content remains readable
   - Buttons remain clickable
   - No horizontal scrolling on mobile sizes

## Expected Behaviors

- The application should work in modern browsers (Chrome, Firefox, Safari, Edge)
- No errors should appear in browser console
- All transitions should be smooth
- Text should be readable with good contrast
- Interactive elements should have hover effects
- Progress tracking should be accurate

## Known Limitations

- PDF files are read as text (may not parse correctly)
- Image files are stored but not displayed in lessons
- Topic extraction is basic and works best with structured content
- Lesson content is template-based rather than truly AI-generated
