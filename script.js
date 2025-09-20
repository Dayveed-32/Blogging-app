 // DOM Elements
 const editorView = document.getElementById('editor-view');
 const browserView = document.getElementById('browser-view');
 const commentsView = document.getElementById('comments-view');
 const addPostBtn = document.getElementById('add-post-btn');
 const newPostBtn = document.getElementById('new-post-btn');
 const titleInput = document.getElementById('title');
 const contentInput = document.getElementById('content');
 const blogPostsContainer = document.getElementById('blog-posts');
 const commentList = document.getElementById('comment-list');
 const commentInput = document.getElementById('comment-input');
 const sendCommentBtn = document.getElementById('send-comment-btn');
 const navItems = document.querySelectorAll('.nav-item');
 const tagFilter = document.getElementById('tag-filter');
 const dateFilter = document.getElementById('date-filter');
 const tagFilterMobile = document.getElementById('tag-filter-mobile');
 const dateFilterMobile = document.getElementById('date-filter-mobile');
 
 // Sample data
 let blogPosts = [
     {
         id: 1,
         title: "Getting Started with Web Development",
         content: "Web development is an exciting field that combines creativity with technical skills...",
         date: "2025-05-15",
         tag: "tech"
     },
     {
         id: 2,
         title: "My Trip to Japan",
         content: "Japan is a beautiful country with rich culture and amazing food...",
         date: "2024-06-20",
         tag: "travel"
     },
     {
         id: 3,
         title: "Best Coffee Shops in the City",
         content: "If you're a coffee lover like me, you'll want to check out these amazing places...",
         date: "2025-07-10",
         tag: "food"
     },
     {
         id: 4,
         title: "Minimalist Lifestyle Tips",
         content: "Living with less can lead to more happiness and freedom...",
         date: "2023-08-05",
         tag: "lifestyle"
     },
     {
         id: 5,
         title: "The Future of AI Technology",
         content: "Artificial intelligence is transforming industries and changing how we live...",
         date: "2024-09-12",
         tag: "tech"
     }
 ];
 
 let comments = [
     {
         id: 1,
         author: "Alex Johnson",
         text: "Great post! I learned a lot from this."
     },
     {
         id: 2,
         author: "Sam Smith",
         text: "I disagree with some points, but still interesting read."
     },
     {
         id: 3,
         author: "Taylor Reed",
         text: "Thanks for sharing your experience!"
     }
 ];
 
 // Initialize the app
 function init() {
     renderBlogPosts();
     renderComments();
     
     // Event listeners
     addPostBtn.addEventListener('click', addNewPost);
     newPostBtn.addEventListener('click', showEditorView);
     sendCommentBtn.addEventListener('click', addComment);
     
     // Filter event listeners
     tagFilter.addEventListener('change', filterPosts);
     dateFilter.addEventListener('change', filterPosts);
     tagFilterMobile.addEventListener('change', filterPosts);
     dateFilterMobile.addEventListener('change', filterPosts);
     
     // Navigation
     navItems.forEach(item => {
         item.addEventListener('click', (e) => {
             e.preventDefault();
             navItems.forEach(nav => nav.classList.remove('active'));
             item.classList.add('active');
             
             const view = item.getAttribute('data-view');
             if (view === 'blog') {
                 showBrowserView();
             }
             // In a real app, other views would be implemented
         });
     });
 }
 
 // View switching functions
 function showEditorView() {
     editorView.classList.add('active');
     browserView.classList.remove('active');
     commentsView.classList.remove('active');
 }
 
 function showBrowserView() {
     browserView.classList.add('active');
     editorView.classList.remove('active');
     commentsView.classList.remove('active');
 }
 
 function showCommentsView() {
     commentsView.classList.add('active');
     editorView.classList.remove('active');
     browserView.classList.remove('active');
 }
 
 // Blog post functions
 function addNewPost() {
     const title = titleInput.value.trim();
     const content = contentInput.value.trim();
     
     if (title && content) {
         const newPost = {
             id: blogPosts.length + 1,
             title: title,
             content: content,
             date: new Date().toISOString().split('T')[0],
             tag: "general"
         };
         
         blogPosts.unshift(newPost);
         renderBlogPosts();
         
         // Reset form
         titleInput.value = '';
         contentInput.value = '';
         
         // Switch to browser view
         showBrowserView();
     }
 }
 
 function renderBlogPosts() {
     blogPostsContainer.innerHTML = '';
     
     blogPosts.forEach(post => {
         const postElement = document.createElement('div');
         postElement.className = 'blog-post';
         postElement.innerHTML = `
             <div class="blog-post-title">${post.title}</div>
             <div class="blog-post-content">${post.content}</div>
             <div class="blog-post-meta">
                 <span>${post.date}</span>
                 <span>${post.tag}</span>
             </div>
         `;
         
         postElement.addEventListener('click', () => {
             showCommentsView();
         });
         
         blogPostsContainer.appendChild(postElement);
     });
 }
 
 function filterPosts() {
     const tagValue = window.innerWidth >= 768 ? tagFilter.value : tagFilterMobile.value;
     const dateValue = window.innerWidth >= 768 ? dateFilter.value : dateFilterMobile.value;
     
     let filteredPosts = [...blogPosts];
     
     if (tagValue !== 'all') {
         filteredPosts = filteredPosts.filter(post => post.tag === tagValue);
     }
     
     if (dateValue) {
         filteredPosts = filteredPosts.filter(post => post.date === dateValue);
     }
     
     // Render filtered posts
     blogPostsContainer.innerHTML = '';
     
     filteredPosts.forEach(post => {
         const postElement = document.createElement('div');
         postElement.className = 'blog-post';
         postElement.innerHTML = `
             <div class="blog-post-title">${post.title}</div>
             <div class="blog-post-content">${post.content}</div>
             <div class="blog-post-meta">
                 <span>${post.date}</span>
                 <span>${post.tag}</span>
             </div>
         `;
         
         postElement.addEventListener('click', () => {
             showCommentsView();
         });
         
         blogPostsContainer.appendChild(postElement);
     });
 }
 
 // Comment functions
 function addComment() {
     const text = commentInput.value.trim();
     
     if (text) {
         const newComment = {
             id: comments.length + 1,
             author: "You",
             text: text
         };
         
         comments.push(newComment);
         renderComments();
         
         // Reset input
         commentInput.value = '';
     }
 }
 
 function renderComments() {
     commentList.innerHTML = '';
     
     comments.forEach(comment => {
         const commentElement = document.createElement('div');
         commentElement.className = 'comment';
         commentElement.innerHTML = `
             <div class="comment-author">${comment.author}</div>
             <div class="comment-text">${comment.text}</div>
         `;
         
         commentList.appendChild(commentElement);
     });
 }
 
 // Initialize the app when DOM is loaded
 document.addEventListener('DOMContentLoaded', init);
