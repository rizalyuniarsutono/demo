import { lazy, Suspense, useEffect } from 'react';
import Index from "./jsx";
import { connect, useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from './store/selectors/AuthSelectors';
import "./css/style.css";
import FormPengaduanAspirasi from './jsx/components/PengaduanAspirasi/FormPengaduanAspirasi';
import FormUsulanPeserta from './jsx/components/UsulanPeserta/FormUsulanPeserta';

const Login = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
  });
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

const nav = [
  {
    url: "/pengelolaan-akun",
    role: [ "admin" ]
  },
  {
    url: "/form-akun",
    role: [ "admin" ]
  },
]

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("accessToken");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   const role = localStorage.getItem("accessRole");
//   const idx = nav.map(x => x.url).indexOf(window.location.pathname.replace(process.env.REACT_APP_URL, ''));
//   if (idx !== -1 && nav[idx].role.indexOf(role) === -1) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();

  const publicRoutes = [
    "/form-pengaduan-aspirasi",
    "/form-usulan-peserta"
  ];

  const isPublicRoute = publicRoutes.some(route => location.pathname.includes(route));

  if (!token && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  const role = localStorage.getItem("accessRole");
  const idx = nav.map(x => x.url).indexOf(window.location.pathname.replace(process.env.REACT_APP_URL, ''));
  
  if (idx !== -1 && nav[idx].role.indexOf(role) === -1) {
    return <Navigate to="/" replace />;
  }

  return children;
};


function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {

  }, []);

  let routeblog = (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/:id?/form-pengaduan-aspirasi' element={<FormPengaduanAspirasi />} />
      <Route path='/:id?/form-usulan-peserta' element={<FormUsulanPeserta />} />
    </Routes>
  );
  return (
    <>
      <Suspense fallback={
        <div id="preloader">
          <div className="sk-three-bounce">
            <div className="sk-child sk-bounce1"></div>
            <div className="sk-child sk-bounce2"></div>
            <div className="sk-child sk-bounce3"></div>
          </div>
        </div>
      }>
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
        {routeblog}
      </Suspense>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

//export default connect((mapStateToProps)(App)); 
export default withRouter(connect(mapStateToProps)(App)); 