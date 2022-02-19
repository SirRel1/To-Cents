const logout = async () => {
    // console.log('click')
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Try again...');
    }
  };
  
  // document.querySelector('.logoutBtn').addEventListener('click', logout);