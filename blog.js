  // DOM Elements
  const editorView = document.getElementById('editor-view');
  const browserView = document.getElementById('browser-view');
  const commentsView = document.getElementById('comments-view');
  const addPostBtn = document.getElementById('add-post-btn');
  const newPostBtn = document.getElementById('new-post-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const backBtn = document.getElementById('back-btn');
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const blogPostsContainer = document.getElementById('blog-posts');
  const commentList = document.getElementById('comment-list');
  const commentInput = document.getElementById('comment-input');
  const sendCommentBtn = document.getElementById('send-comment-btn');
  const navItems = document.querySelectorAll('.nav-item');
  
  // Sample data
  let blogPosts = [
      {
          id: 1,
          title: "Getting Started with Web Development",
          content: "Web development is an exciting field that combines creativity with technical skills...",
          date: "2023-05-15",
          tag: "tech"
      },
      {
          id: 2,
          title: "My Trip to Japan",
          content: "Japan is a beautiful country with rich culture and amazing food...",
          date: "2023-06-20",
          tag: "travel"
      },
      {
          id: 3,
          title: "Best Coffee Shops in the City",
          content: "If you're a coffee lover like me, you'll want to check out these amazing places...",
          date: "2023-07-10",
          tag: "food"
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
      }
  ];
  
  // Initialize the app
  function init() {
      renderBlogPosts();
      renderComments();
      
      // Event listeners
      addPostBtn.addEventListener('click', addNewPost);
      newPostBtn.addEventListener('click', showEditorView);
      cancelBtn.addEventListener('click', showBrowserView);
      backBtn.addEventListener('click', showBrowserView);
      sendCommentBtn.addEventListener('click', addComment);
      
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