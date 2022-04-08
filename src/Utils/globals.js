const globalNames = 
{
  APIURL : 'http://127.0.0.1:5000/api',
  RAWURL : 'http://127.0.0.1:5000',
  superadminlogout : function logout(e){
        e.preventDefault();
        localStorage.clear();
        window.location.href='/superadmin/login';
  },
  USERFILES : 'http://127.0.0.1:5000/userfiles/',
  BLOGFILES : 'http://127.0.0.1:5000/blog-files/',
  PHARMACYFILES : 'http://127.0.0.1:5000/pharmacy-files/',
  DIAGNOSTICSFILES : 'http://127.0.0.1:5000/lab-tests/',

  
}
export default globalNames;