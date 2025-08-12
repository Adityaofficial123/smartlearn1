<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin - Course Management System</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
  <link rel="stylesheet" href="style.css" />
  <style>
    .glass-effect {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .gradient-bg {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .shadow-elegant {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: all 0.3s ease;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    }
    .table-row:hover {
      background: rgba(102, 126, 234, 0.05);
      transform: translateY(-1px);
      transition: all 0.2s ease;
    }
    .day-card {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      border-radius: 15px;
      transition: all 0.3s ease;
    }
    .day-card:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 30px rgba(240, 147, 251, 0.3);
    }

    /* Ensure input text is visible (dark text on white background) */
    .glass-effect input,
    .glass-effect textarea,
    .glass-effect select {
      color: #1f2937 !important; /* gray-800 */
      background-color: #ffffff !important;
      caret-color: #1f2937 !important;
    }
    .glass-effect input::placeholder,
    .glass-effect textarea::placeholder,
    .glass-effect select::placeholder {
      color: #6b7280 !important; /* gray-500 */
    }
    .day-card input,
    .day-card textarea,
    .day-card select {
      color: #1f2937 !important;
      background-color: #ffffff !important;
      caret-color: #1f2937 !important;
      border-color: rgba(209, 213, 219, 1) !important; /* gray-300 */
    }
    .day-card input::placeholder,
    .day-card textarea::placeholder,
    .day-card select::placeholder {
      color: #6b7280 !important;
    }
  </style>
</head>

<body class="min-h-screen gradient-bg">
  <!-- Header -->
  <div class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-3xl font-bold text-gray-900">SmartLearn Admin</h1>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">Course Management System</span>
          <div class="h-8 w-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Quick Nav -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <a href="#enrollments" class="glass-effect rounded-xl p-3 text-center text-gray-700 hover:shadow-elegant">Enrollments</a>
      <a href="#payments" class="glass-effect rounded-xl p-3 text-center text-gray-700 hover:shadow-elegant">Paid Requests</a>
      <a href="#lectures" class="glass-effect rounded-xl p-3 text-center text-gray-700 hover:shadow-elegant">Add Lecture</a>
      <a href="#messages" class="glass-effect rounded-xl p-3 text-center text-gray-700 hover:shadow-elegant">Contact Messages</a>
    </div>
    <!-- Enrollment Management Section -->
    <div id="enrollments" class="glass-effect rounded-2xl p-6 mb-8 shadow-elegant">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">👥 Enrollments Overview</h2>
      <button id="load-enrollments-btn" class="btn-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg mb-4">Load Enrollments</button>
      <div id="enrollments-table-container">
        <!-- Table will be rendered here -->
      </div>
    </div>
    <!-- Payment Requests Section -->
    <div id="payments" class="glass-effect rounded-2xl p-6 mb-8 shadow-elegant">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">💸 Pending Paid Enrollments</h2>
      <button id="load-payments-btn" class="btn-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg mb-4">Load Pending</button>
      <div id="payments-table-container">
        <!-- Payment requests will be rendered here -->
      </div>
    </div>

    <!-- Add Lecture to Existing Course -->
    <div id="lectures" class="glass-effect rounded-2xl p-6 mb-8 shadow-elegant">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">🎬 Upload New Lecture to Existing Course</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Course ID</label>
          <div class="flex gap-3">
            <input type="text" id="al-course-id" class="flex-1 px-4 py-3 border rounded-lg" placeholder="e.g., data-science" />
            <button id="al-fetch-days" class="btn-primary text-white px-4 rounded-lg">Fetch Days</button>
          </div>
          <div id="al-course-title" class="text-sm text-gray-600 mt-1"></div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Day</label>
          <select id="al-day-select" class="w-full px-4 py-3 border rounded-lg">
            <option value="">-- no course loaded --</option>
          </select>
          <button id="al-create-day" class="mt-2 bg-gray-700 text-white px-3 py-2 rounded">+ Create New Day</button>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Lecture Title</label>
          <input type="text" id="al-lecture-title" class="w-full px-4 py-3 border rounded-lg" placeholder="Intro to Topic" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
          <input type="url" id="al-video-url" class="w-full px-4 py-3 border rounded-lg" placeholder="https://... (YouTube, Cloudinary, etc.)" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Duration (optional)</label>
          <input type="text" id="al-duration" class="w-full px-4 py-3 border rounded-lg" placeholder="e.g., 12:34" />
        </div>
        <div class="md:col-span-2">
          <button id="al-add-lecture" class="btn-primary text-white px-6 py-3 rounded-lg font-semibold">Add Lecture</button>
          <div id="al-status" class="text-sm text-gray-600 mt-2"></div>
        </div>
      </div>
    </div>

    <!-- Contact Messages from RTDB -->
    <div id="messages" class="glass-effect rounded-2xl p-6 mb-8 shadow-elegant">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">📥 Get In Touch Messages</h2>
      <button id="load-messages-btn" class="btn-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg mb-4">Load Messages</button>
      <div id="messages-table-container"></div>
    </div>
    <!-- Course Search & Load Section -->
    <div class="glass-effect rounded-2xl p-6 mb-8 shadow-elegant">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">🔍 Load Existing Course</h2>
      <div class="flex gap-4 items-end">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Course ID or Title</label>
          <input type="text" id="search-course-id" 
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                 placeholder="Enter course ID or title to load existing course">
        </div>
        <button id="load-course-btn" class="btn-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg">
          Load Course
        </button>
      </div>
    </div>

    <!-- Course Basic Information -->
    <div class="glass-effect rounded-2xl p-6 mb-8 shadow-elegant">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">📚 Course Information</h2>
      <form id="course-form">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
            <input type="text" id="course-title" required
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Instructor *</label>
            <input type="text" id="course-instructor" required
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea id="course-description" required rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Course Image URL *</label>
            <input type="url" id="course-image" required
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <!-- Instructor Image URL (admin-controlled) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Instructor Image URL</label>
            <input type="url" id="instructor-image"
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                   placeholder="https://... (optional)">
          </div>
          <!-- Instructor Bio -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Instructor Bio</label>
            <textarea id="instructor-bio" rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Short bio (optional)"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <input type="text" id="course-category" required
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Level *</label>
            <select id="course-level" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
            <input type="text" id="course-duration" required placeholder="e.g., 8 weeks"
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Price (0 for Free) *</label>
            <input type="number" id="course-price" required min="0" step="0.01"
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Learning Objectives (comma separated)</label>
            <input type="text" id="course-objectives" placeholder="Learn Python basics, Understand data structures, etc."
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="course-featured" class="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-2 focus:ring-purple-500">
            <label for="course-featured" class="ml-2 text-sm font-medium text-gray-700">Featured Course</label>
          </div>
        </div>
      </form>
    </div>

    <!-- Days Management Section -->
    <div class="glass-effect rounded-2xl p-6 mb-8 shadow-elegant">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">📅 Course Days Management</h2>
        <button id="add-day-btn" class="btn-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg">
          + Add New Day
        </button>
      </div>
      <div id="days-container" class="space-y-6">
        <!-- Days will be rendered here -->
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-center space-x-4">
      <button type="button" id="save-course-btn" class="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg">
        💾 Save Course
      </button>
      <button type="button" id="reset-form-btn" class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg">
        🔄 Reset Form
      </button>
    </div>

    <!-- Status Message -->
    <div id="admin-message" class="mt-8 text-center"></div>
  </div>

  <script src="firebase.js"></script>
  <script>
    // --- Enrollment Management ---
    const enrollBtn = document.getElementById('load-enrollments-btn');
    const enrollContainer = document.getElementById('enrollments-table-container');
    enrollBtn.disabled = true;
    enrollBtn.classList.add('opacity-50', 'cursor-not-allowed');

    // --- Payment Requests Management ---
    const paymentsBtn = document.getElementById('load-payments-btn');
    const paymentsContainer = document.getElementById('payments-table-container');
    paymentsBtn.disabled = true;
    paymentsBtn.classList.add('opacity-50', 'cursor-not-allowed');

    function enableEnrollBtn() {
      enrollBtn.disabled = false;
      enrollBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      paymentsBtn.disabled = false;
      paymentsBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // Wait for Firebase to be ready
    function checkFirebaseReadyAndEnableBtn() {
      if (window.firebaseServicesInitialized && window.db && window.DatabaseAPI) {
        enableEnrollBtn();
      } else {
        setTimeout(checkFirebaseReadyAndEnableBtn, 300);
      }
    }
    checkFirebaseReadyAndEnableBtn();

    enrollBtn.onclick = loadEnrollments;

    paymentsBtn.onclick = loadPaymentRequests;

    // ===== Add Lecture to Existing Course (Firestore) =====
    const alCourseIdEl = document.getElementById('al-course-id');
    const alFetchDaysBtn = document.getElementById('al-fetch-days');
    const alCourseTitleEl = document.getElementById('al-course-title');
    const alDaySelect = document.getElementById('al-day-select');
    const alCreateDayBtn = document.getElementById('al-create-day');
    const alLectureTitleEl = document.getElementById('al-lecture-title');
    const alVideoUrlEl = document.getElementById('al-video-url');
    const alDurationEl = document.getElementById('al-duration');
    const alAddLectureBtn = document.getElementById('al-add-lecture');
    const alStatusEl = document.getElementById('al-status');

    async function fetchCourseAndPopulateDays() {
      alStatusEl.textContent = 'Fetching course...';
      try {
        if (!window.firebaseServicesInitialized || !window.db) {
          alStatusEl.textContent = 'Firebase not ready';
          return;
        }
        const courseId = (alCourseIdEl.value || '').trim();
        if (!courseId) { alStatusEl.textContent = 'Enter Course ID'; return; }
        const doc = await window.db().collection('courses').doc(courseId).get();
        if (!doc.exists) { alStatusEl.textContent = 'Course not found'; alDaySelect.innerHTML = '<option value="">-- not found --</option>'; return; }
        const data = doc.data();
        alCourseTitleEl.textContent = `Loaded: ${data.title || courseId}`;
        const modules = Array.isArray(data.modules) ? data.modules : [];
        alDaySelect.innerHTML = '';
        modules.forEach((m, idx) => {
          const opt = document.createElement('option');
          opt.value = String(idx);
          opt.textContent = m.title || `Day ${idx + 1}`;
          alDaySelect.appendChild(opt);
        });
        if (modules.length === 0) {
          const opt = document.createElement('option');
          opt.value = '';
          opt.textContent = '-- no days yet --';
          alDaySelect.appendChild(opt);
        }
        alStatusEl.textContent = '';
      } catch (e) {
        alStatusEl.textContent = 'Error: ' + e.message;
      }
    }

    async function createNewDayForCourse() {
      try {
        if (!window.firebaseServicesInitialized || !window.db) return;
        const courseId = (alCourseIdEl.value || '').trim();
        if (!courseId) { alStatusEl.textContent = 'Enter Course ID'; return; }
        const docRef = window.db().collection('courses').doc(courseId);
        const doc = await docRef.get();
        if (!doc.exists) { alStatusEl.textContent = 'Course not found'; return; }
        const data = doc.data();
        const modules = Array.isArray(data.modules) ? data.modules : [];
        const newTitle = `Day ${modules.length + 1}`;
        modules.push({ title: newTitle, lectures: [], notes: [] });
        await docRef.update({ modules, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
        alStatusEl.textContent = `Created ${newTitle}`;
        await fetchCourseAndPopulateDays();
      } catch (e) {
        alStatusEl.textContent = 'Error: ' + e.message;
      }
    }

    async function addLectureToCourse() {
      try {
        if (!window.firebaseServicesInitialized || !window.db) return;
        const courseId = (alCourseIdEl.value || '').trim();
        const title = (alLectureTitleEl.value || '').trim();
        const videoUrl = (alVideoUrlEl.value || '').trim();
        const duration = (alDurationEl.value || '').trim();
        if (!courseId || !title || !videoUrl) { alStatusEl.textContent = 'Provide Course ID, Lecture Title and Video URL'; return; }
        const docRef = window.db().collection('courses').doc(courseId);
        const doc = await docRef.get();
        if (!doc.exists) { alStatusEl.textContent = 'Course not found'; return; }
        const data = doc.data();
        const modules = Array.isArray(data.modules) ? data.modules : [];
        let dayIndex = parseInt(alDaySelect.value, 10);
        if (isNaN(dayIndex) || dayIndex < 0 || dayIndex >= modules.length) {
          // If no day selected, create day 1
          modules.push({ title: `Day ${modules.length + 1}`, lectures: [], notes: [] });
          dayIndex = modules.length - 1;
        }
        const lecture = { title, videoUrl, duration };
        modules[dayIndex].lectures = Array.isArray(modules[dayIndex].lectures) ? modules[dayIndex].lectures : [];
        modules[dayIndex].lectures.push(lecture);
        await docRef.update({ modules, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
        alStatusEl.textContent = 'Lecture added successfully';
        alLectureTitleEl.value = '';
        alVideoUrlEl.value = '';
        alDurationEl.value = '';
        await fetchCourseAndPopulateDays();
      } catch (e) {
        alStatusEl.textContent = 'Error: ' + e.message;
      }
    }

    // ===== Contact Messages (Realtime Database) =====
    const messagesBtn = document.getElementById('load-messages-btn');
    const messagesContainer = document.getElementById('messages-table-container');

    async function detectMessagesPath() {
      // Try common nodes
      const candidates = ['contact-messages', 'contact_messages', 'messages', 'get_in_touch'];
      for (const path of candidates) {
        try {
          if (!window.rtdb) continue;
          const snap = await window.rtdb().ref(path).limitToFirst(1).get();
          if (snap.exists()) return path;
        } catch (e) { /* ignore */ }
      }
      return null;
    }

    async function loadMessages() {
      messagesContainer.innerHTML = '<div class="text-gray-500">Loading messages...</div>';
      try {
        if (!window.firebaseServicesInitialized || !window.rtdb) {
          messagesContainer.innerHTML = '<div class="text-red-600">Realtime Database not ready.</div>';
          return;
        }
        const path = await detectMessagesPath();
        if (!path) { messagesContainer.innerHTML = '<div class="text-gray-500">No messages node found (contact-messages/contact_messages/messages/get_in_touch).</div>'; return; }
        const snap = await window.rtdb().ref(path).get();
        const val = snap.val() || {};
        const items = Object.entries(val).map(([id, m]) => ({ id, ...m }));
        if (items.length === 0) { messagesContainer.innerHTML = '<div class="text-gray-500">No messages.</div>'; return; }
        let html = `<div class="overflow-x-auto"><table class="min-w-full bg-white rounded-lg shadow">
          <thead class="bg-gray-50"><tr>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Name</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Email</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Mobile</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Message</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Status</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Actions</th>
          </tr></thead><tbody class="text-gray-700">`;
        items.forEach(m => {
          const name = m.name || m.userName || '-';
          const email = m.email || m.userEmail || '-';
          const mobile = m.mobile || m.phone || '-';
          const msg = m.message || m.msg || m.text || '-';
          const status = m.status || (m.read ? 'read' : 'unread');
          html += `<tr class="table-row">
            <td class="px-4 py-2 border-b">${name}</td>
            <td class="px-4 py-2 border-b">${email}</td>
            <td class="px-4 py-2 border-b">${mobile}</td>
            <td class="px-4 py-2 border-b text-sm">${msg}</td>
            <td class="px-4 py-2 border-b">${status}</td>
            <td class="px-4 py-2 border-b">
              <button class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2" onclick="markMessageRead('${m.id}')">Mark Read</button>
              <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onclick="deleteMessage('${m.id}')">Delete</button>
            </td>
          </tr>`;
        });
        html += '</tbody></table></div>';
        messagesContainer.innerHTML = html;
        // Store path for action handlers
        window._messagesPath = await detectMessagesPath();
      } catch (e) {
        messagesContainer.innerHTML = `<div class="text-red-600">Error loading messages: ${e.message}</div>`;
      }
    }

    async function markMessageRead(id) {
      try {
        if (!window._messagesPath || !window.rtdb) return;
        // Set both a boolean flag and a status string for compatibility
        await window.rtdb().ref(`${window._messagesPath}/${id}`).update({ read: true, status: 'read' });
        await loadMessages();
      } catch (e) {
        showMessage('Error marking read: ' + e.message, 'error');
      }
    }

    async function deleteMessage(id) {
      try {
        if (!window._messagesPath || !window.rtdb) return;
        await window.rtdb().ref(`${window._messagesPath}/${id}`).remove();
        await loadMessages();
      } catch (e) {
        showMessage('Error deleting: ' + e.message, 'error');
      }
    }

    async function loadEnrollments() {
      enrollContainer.innerHTML = '<div class="text-gray-500">Loading enrollments...</div>';
      try {
        if (!window.firebaseServicesInitialized || !window.DatabaseAPI) {
          enrollContainer.innerHTML = '<div class="text-red-600">Firebase not ready.</div>';
          return;
        }
        
        // Fetch enrollments from both Firestore and Realtime Database
        const firestoreEnrollments = await window.DatabaseAPI.getAllEnrollmentsSimple();
        const approvedEnrollments = await window.DatabaseAPI.getAllApprovedEnrollmentsOnce();
        
        // Combine both sources
        const allEnrollments = [...firestoreEnrollments, ...approvedEnrollments];
        
        if (allEnrollments.length === 0) {
          enrollContainer.innerHTML = '<div class="text-gray-500">No enrollments found.</div>';
          return;
        }
        
        // Fetch all courses for mapping
        const courseSnap = await firebase.firestore().collection('courses').get();
        const courses = {};
        courseSnap.docs.forEach(doc => { courses[doc.id] = doc.data(); });

        // Render table
        let html = `<div class="overflow-x-auto"><table class="min-w-full bg-white rounded-lg shadow">
          <thead class="bg-gray-50"><tr>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">User Name</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">User Email</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Course</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Progress</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Completed</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Enrolled At</th>
          </tr></thead><tbody class="text-gray-700">`;
        allEnrollments.forEach(e => {
          const course = courses[e.courseId] || {};
          html += `<tr class="table-row">
            <td class="px-4 py-2 border-b">${e.userName || '-'}</td>
            <td class="px-4 py-2 border-b">${e.userEmail || '-'}</td>
            <td class="px-4 py-2 border-b font-semibold">${course.title || e.courseId || '-'}</td>
            <td class="px-4 py-2 border-b">${e.progress != null ? e.progress + '%' : '-'}</td>
            <td class="px-4 py-2 border-b">${e.completed ? '✅' : ''}</td>
            <td class="px-4 py-2 border-b text-xs">${e.enrolledAt && e.enrolledAt.toDate ? e.enrolledAt.toDate().toLocaleString() : '-'}</td>
          </tr>`;
        });
        html += '</tbody></table></div>';
        enrollContainer.innerHTML = html;
      } catch (err) {
        enrollContainer.innerHTML = `<div class="text-red-600">Error loading enrollments: ${err.message}</div>`;
      }
    }

    // --- Payment Requests Table ---
    async function loadPaymentRequests() {
      paymentsContainer.innerHTML = '<div class="text-gray-500">Loading payment requests...</div>';
      try {
        if (!window.firebaseServicesInitialized || !window.DatabaseAPI) {
          paymentsContainer.innerHTML = '<div class="text-red-600">Firebase not ready.</div>';
          return;
        }
        
        console.log('Loading payment requests from Realtime Database...');
        // Fetch pending enrollments from RTDB
        const requests = await window.DatabaseAPI.getAllPendingEnrollmentsOnce();
        console.log('Found pending requests:', requests.length);
        
        if (requests.length === 0) {
          paymentsContainer.innerHTML = '<div class="text-gray-500">No pending payment requests found.</div>';
          return;
        }
        
        // Fetch all courses for mapping
        const courseSnap = await firebase.firestore().collection('courses').get();
        const courses = {};
        courseSnap.docs.forEach(doc => { courses[doc.id] = doc.data(); });

        // Render table
        let html = `<div class="overflow-x-auto"><table class="min-w-full bg-white rounded-lg shadow">
          <thead class="bg-gray-50"><tr>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">User Name</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">User Email</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Course</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Mobile</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Payment Proof</th>
            <th class="px-4 py-2 border-b text-left text-gray-800 font-semibold">Actions</th>
          </tr></thead><tbody class="text-gray-700">`;
        requests.forEach(r => {
          const course = courses[r.courseId] || {};
          const proof = r.proofUrl || r.screenshotUrl || '';
          html += `<tr class="table-row">
            <td class="px-4 py-2 border-b">${r.userName || '-'}</td>
            <td class="px-4 py-2 border-b">${r.userEmail || '-'}</td>
            <td class="px-4 py-2 border-b font-semibold">${course.title || r.courseId || '-'}</td>
            <td class="px-4 py-2 border-b">${r.mobile || '-'}</td>
            <td class="px-4 py-2 border-b"><a href="${proof}" target="_blank"><img src="${proof}" alt="Payment Proof" class="h-16 rounded shadow"/></a></td>
            <td class="px-4 py-2 border-b">
              <button class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2" onclick="approvePaymentRequest('${r.id}')">Approve</button>
              <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onclick="rejectPaymentRequest('${r.id}')">Reject</button>
            </td>
          </tr>`;
        });
        html += '</tbody></table></div>';
        paymentsContainer.innerHTML = html;
      } catch (err) {
        paymentsContainer.innerHTML = `<div class="text-red-600">Error loading payment requests: ${err.message}</div>`;
      }
    }

    // Approve payment: enroll user and mark request as approved
    async function approvePaymentRequest(pendingId) {
      try {
        if (!window.DatabaseAPI) {
          alert('Firebase not ready');
          return;
        }
        
        const confirmed = confirm('Are you sure you want to approve this payment request?');
        if (!confirmed) return;
        
        await window.DatabaseAPI.approvePaymentRequest(pendingId);
        alert('Payment request approved successfully!');
        loadPaymentRequests(); // Refresh the list
      } catch (err) {
        console.error('Error approving request:', err);
        alert(`Error approving request: ${err.message}`);
      }
    }

    // Reject payment: mark request as rejected
    async function rejectPaymentRequest(pendingId) {
      try {
        if (!window.DatabaseAPI) {
          alert('Firebase not ready');
          return;
        }
        
        const confirmed = confirm('Are you sure you want to reject this payment request?');
        if (!confirmed) return;
        
        await window.DatabaseAPI.rejectPaymentRequest(pendingId);
        alert('Payment request rejected successfully!');
        loadPaymentRequests(); // Refresh the list
      } catch (err) {
        console.error('Error rejecting request:', err);
        alert(`Error rejecting request: ${err.message}`);
      }
    }

  </script>
  <script>
    let days = [];
    let loadedCourseId = null;

    // Initialize with one empty day
    function initializeDays() {
      if (days.length === 0) {
        days = [{
          title: 'Day 1',
          lectures: [],
          notes: []
        }];
      }
      renderDays();
    }

    function renderDays() {
      const container = document.getElementById('days-container');
      container.innerHTML = '';
      
      days.forEach((day, dayIdx) => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card p-6';
        dayCard.innerHTML = `
          <div class="flex justify-between items-center mb-4">
            <input type="text" value="${day.title}" 
                   class="text-2xl font-bold bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                   onchange="updateDayTitle(${dayIdx}, this.value)">
            <button onclick="removeDay(${dayIdx})" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              🗑️ Delete Day
            </button>
          </div>
          
          <!-- Lectures Section -->
          <div class="bg-white rounded-lg p-4 mb-4">
            <div class="flex justify-between items-center mb-3">
              <h4 class="text-lg font-semibold">🎬 Lectures</h4>
              <button onclick="addLecture(${dayIdx})" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                + Add Lecture
              </button>
            </div>
            <div class="space-y-2" id="lectures-${dayIdx}">
              ${renderLectures(dayIdx)}
            </div>
          </div>
          
          <!-- Notes Section -->
          <div class="bg-white rounded-lg p-4">
            <div class="flex justify-between items-center mb-3">
              <h4 class="text-lg font-semibold">📝 Notes</h4>
              <button onclick="addNote(${dayIdx})" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                + Add Note
              </button>
            </div>
            <div class="space-y-2" id="notes-${dayIdx}">
              ${renderNotes(dayIdx)}
            </div>
          </div>
        `;
        container.appendChild(dayCard);
      });
    }

    function renderLectures(dayIdx) {
      const lectures = days[dayIdx].lectures || [];
      return lectures.map((lecture, lectureIdx) => `
        <div class="bg-white rounded-lg p-3 flex gap-3 items-center">
          <input type="text" placeholder="Lecture Title" value="${lecture.title || ''}" 
                 class="flex-1 px-3 py-2 rounded bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-purple-500 focus:outline-none"
                 onchange="updateLecture(${dayIdx}, ${lectureIdx}, 'title', this.value)">
          <input type="text" placeholder="Duration" value="${lecture.duration || ''}" 
                 class="w-24 px-3 py-2 rounded bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-purple-500 focus:outline-none"
                 onchange="updateLecture(${dayIdx}, ${lectureIdx}, 'duration', this.value)">
          <input type="url" placeholder="Video URL" value="${lecture.videoUrl || ''}" 
                 class="flex-1 px-3 py-2 rounded bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-purple-500 focus:outline-none"
                 onchange="updateLecture(${dayIdx}, ${lectureIdx}, 'videoUrl', this.value)">
          <button onclick="removeLecture(${dayIdx}, ${lectureIdx})" class="text-red-600 hover:text-red-700 font-bold text-xl">
            ✕
          </button>
        </div>
      `).join('');
    }

    function renderNotes(dayIdx) {
      const notes = days[dayIdx].notes || [];
      return notes.map((note, noteIdx) => `
        <div class="bg-white rounded-lg p-3">
          <div class="flex gap-3 items-start mb-2">
            <input type="text" placeholder="Note Title" value="${note.title || ''}" 
                   class="flex-1 px-3 py-2 rounded bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-purple-500 focus:outline-none"
                   onchange="updateNote(${dayIdx}, ${noteIdx}, 'title', this.value)">
            <input type="url" placeholder="PDF URL (optional)" value="${note.pdfUrl || ''}" 
                   class="flex-1 px-3 py-2 rounded bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-purple-500 focus:outline-none"
                   onchange="updateNote(${dayIdx}, ${noteIdx}, 'pdfUrl', this.value)">
            <button onclick="removeNote(${dayIdx}, ${noteIdx})" class="text-red-600 hover:text-red-700 font-bold text-xl">
              ✕
            </button>
          </div>
          <textarea placeholder="Note Content (HTML allowed)" 
                    class="w-full px-3 py-2 rounded bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-purple-500 focus:outline-none h-20"
                    onchange="updateNote(${dayIdx}, ${noteIdx}, 'content', this.value)">${note.content || ''}</textarea>
        </div>
      `).join('');
    }

    // Day Management Functions
    function updateDayTitle(dayIdx, title) {
      days[dayIdx].title = title;
    }

    function addDay() {
      const dayNumber = days.length + 1;
      days.push({
        title: `Day ${dayNumber}`,
        lectures: [],
        notes: []
      });
      renderDays();
    }

    function removeDay(dayIdx) {
      if (days.length > 1) {
        days.splice(dayIdx, 1);
        renderDays();
      } else {
        showMessage('At least one day is required!', 'error');
      }
    }

    // Lecture Management Functions
    function addLecture(dayIdx) {
      if (!days[dayIdx].lectures) days[dayIdx].lectures = [];
      days[dayIdx].lectures.push({ title: '', duration: '', videoUrl: '' });
      renderDays();
    }

    function updateLecture(dayIdx, lectureIdx, field, value) {
      days[dayIdx].lectures[lectureIdx][field] = value;
    }

    function removeLecture(dayIdx, lectureIdx) {
      days[dayIdx].lectures.splice(lectureIdx, 1);
      renderDays();
    }

    // Note Management Functions
    function addNote(dayIdx) {
      if (!days[dayIdx].notes) days[dayIdx].notes = [];
      days[dayIdx].notes.push({ title: '', content: '', pdfUrl: '' });
      renderDays();
    }

    function updateNote(dayIdx, noteIdx, field, value) {
      days[dayIdx].notes[noteIdx][field] = value;
    }

    function removeNote(dayIdx, noteIdx) {
      days[dayIdx].notes.splice(noteIdx, 1);
      renderDays();
    }

    function showMessage(message, type = 'success') {
      const messageEl = document.getElementById('admin-message');
      messageEl.textContent = message;
      messageEl.className = `mt-8 text-center font-semibold text-lg ${
        type === 'success' ? 'text-green-600' : 'text-red-600'
      }`;
      setTimeout(() => {
        messageEl.textContent = '';
        messageEl.className = 'mt-8 text-center';
      }, 5000);
    }

    // Load Course Function (supports search by ID or Title)
    async function loadCourse() {
      const searchInput = document.getElementById('search-course-id').value.trim();
      if (!searchInput) {
        showMessage('Please enter a course ID or title.', 'error');
        return;
      }

      if (!window.firebaseServicesInitialized || !window.db) {
        showMessage('Firebase not ready. Please wait...', 'error');
        return;
      }

      let doc = null;
      let courseId = null;
      let data = null;
      try {
        // Try as ID first
        const idCandidate = searchInput.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        let docRef = await window.db().collection('courses').doc(idCandidate).get();
        if (docRef.exists) {
          doc = docRef;
          courseId = idCandidate;
        } else {
          // Try as Title (case-insensitive)
          const snap = await window.db().collection('courses').where('title', '==', searchInput).get();
          if (!snap.empty) {
            doc = snap.docs[0];
            courseId = doc.id;
          } else {
            // Try case-insensitive search
            const allSnap = await window.db().collection('courses').get();
            const found = allSnap.docs.find(d => (d.data().title || '').toLowerCase() === searchInput.toLowerCase());
            if (found) {
              doc = found;
              courseId = found.id;
            }
          }
        }

        if (!doc) {
          showMessage('Course not found.', 'error');
          return;
        }

        data = doc.data();
        loadedCourseId = courseId;

        // Populate basic course info
        document.getElementById('course-title').value = data.title || '';
        document.getElementById('course-description').value = data.description || '';
        document.getElementById('course-instructor').value = data.instructor || '';
        document.getElementById('course-image').value = data.image || '';
        document.getElementById('instructor-image').value = data.instructorImage || '';
        document.getElementById('instructor-bio').value = data.instructorBio || '';
        document.getElementById('course-category').value = data.category || '';
        document.getElementById('course-level').value = data.level || '';
        document.getElementById('course-duration').value = data.duration || '';
        document.getElementById('course-price').value = data.price || 0;
        document.getElementById('course-objectives').value = (data.objectives || []).join(', ');
        document.getElementById('course-featured').checked = !!data.featured;

        // Load days structure
        if (data.modules && data.modules.length > 0) {
          days = data.modules.map(module => ({
            title: module.title || 'Day',
            lectures: module.lectures || [],
            notes: module.notes || []
          }));
        } else {
          days = [{
            title: 'Day 1',
            lectures: [],
            notes: []
          }];
        }

        renderDays();
        showMessage('Course loaded successfully! You can now edit and add content.');
      } catch (error) {
        showMessage('Error loading course: ' + error.message, 'error');
      }
    }

    // Save Course Function
    async function saveCourse() {
      if (!window.firebaseServicesInitialized || !window.db) {
        showMessage('Firebase not ready. Please wait...', 'error');
        return;
      }

      const title = document.getElementById('course-title').value.trim();
      const description = document.getElementById('course-description').value.trim();
      const instructor = document.getElementById('course-instructor').value.trim();
      const image = document.getElementById('course-image').value.trim();
      const instructorImage = document.getElementById('instructor-image').value.trim();
      const instructorBio = document.getElementById('instructor-bio').value.trim();
      const category = document.getElementById('course-category').value.trim();
      const level = document.getElementById('course-level').value.trim();
      const duration = document.getElementById('course-duration').value.trim();
      const price = parseFloat(document.getElementById('course-price').value);
      const objectives = document.getElementById('course-objectives').value.split(',').map(o => o.trim()).filter(Boolean);
      const featured = document.getElementById('course-featured').checked;

      // Validation
      if (!title || !description || !instructor || !image || !category || !level || !duration || isNaN(price)) {
        showMessage('Please fill all required fields.', 'error');
        return;
      }

      if (days.length === 0) {
        showMessage('Please add at least one day.', 'error');
        return;
      }

      const hasLectures = days.some(day => day.lectures && day.lectures.length > 0);
      if (!hasLectures) {
        showMessage('Please add at least one lecture.', 'error');
        return;
      }

      try {
        const course = {
          title, description, instructor, image, instructorImage, instructorBio, category, level, duration, price,
          objectives, featured,
          modules: days.map(day => ({
            title: day.title,
            lectures: day.lectures || [],
            notes: day.notes || []
          })),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const courseId = loadedCourseId || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        await window.db().collection('courses').doc(courseId).set({ id: courseId, ...course }, { merge: true });

        showMessage('✅ Course saved successfully!');
        
        if (!loadedCourseId) {
          resetForm();
        }
      } catch (error) {
        showMessage('Error saving course: ' + error.message, 'error');
      }
    }

    function resetForm() {
      document.getElementById('course-form').reset();
      document.getElementById('search-course-id').value = '';
      days = [{
        title: 'Day 1',
        lectures: [],
        notes: []
      }];
      loadedCourseId = null;
      renderDays();
      showMessage('Form reset successfully.');
    }

    // Global function assignments
    window.updateDayTitle = updateDayTitle;
    window.addDay = addDay;
    window.removeDay = removeDay;
    window.addLecture = addLecture;
    window.updateLecture = updateLecture;
    window.removeLecture = removeLecture;
    window.addNote = addNote;
    window.updateNote = updateNote;
    window.removeNote = removeNote;

/* duplicate block removed: saveCourse/resetForm/global assignments (already defined above) */

// Event Listeners
document.getElementById('add-day-btn').onclick = addDay;
document.getElementById('load-course-btn').onclick = loadCourse;
document.getElementById('save-course-btn').onclick = saveCourse;
document.getElementById('reset-form-btn').onclick = resetForm;
// Add Lecture listeners
if (alFetchDaysBtn) alFetchDaysBtn.onclick = fetchCourseAndPopulateDays;
if (alCreateDayBtn) alCreateDayBtn.onclick = createNewDayForCourse;
if (alAddLectureBtn) alAddLectureBtn.onclick = addLectureToCourse;
// Messages listener
if (messagesBtn) messagesBtn.onclick = loadMessages;

// Initialize
initializeDays();
// Expose for inline onclick
window.markMessageRead = markMessageRead;
window.deleteMessage = deleteMessage;
</script>

</body>
</html>
