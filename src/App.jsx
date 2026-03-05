import React, { lazy, Suspense, useEffect, useState, Component } from 'react'
import { Link, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import {
  AppBar, Box, Button, CircularProgress, Divider, Drawer,
  IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Tooltip, Typography, useMediaQuery, useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SchoolIcon from '@mui/icons-material/School'
import ArticleIcon from '@mui/icons-material/Article'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import MicIcon from '@mui/icons-material/Mic'
import EditIcon from '@mui/icons-material/Edit'
import { useAuthStore } from './store/useAuthStore'
import { useProgressStore } from './store/useProgressStore'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>Something went wrong</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontFamily: 'monospace' }}>
            {this.state.error.message}
          </Typography>
          <Button variant="outlined" onClick={() => { this.setState({ error: null }); window.location.href = '/' }}>
            Go to Dashboard
          </Button>
        </Box>
      )
    }
    return this.props.children
  }
}

const AuthView           = lazy(() => import('./views/AuthView'))
const DashboardView      = lazy(() => import('./views/DashboardView'))
const PracticeHubView    = lazy(() => import('./views/PracticeHubView'))
const ExamHubView        = lazy(() => import('./views/ExamHubView'))
const AnalyticsView      = lazy(() => import('./views/AnalyticsView'))
const SettingsView       = lazy(() => import('./views/SettingsView'))
const ReadingPracticeView   = lazy(() => import('./views/practice/ReadingPracticeView'))
const ListeningPracticeView = lazy(() => import('./views/practice/ListeningPracticeView'))
const SpeakingPracticeView  = lazy(() => import('./views/practice/SpeakingPracticeView'))
const WritingPracticeView   = lazy(() => import('./views/practice/WritingPracticeView'))
const ExamStartView  = lazy(() => import('./views/exam/ExamStartView'))
const ExamReviewView = lazy(() => import('./views/exam/ExamReviewView'))

const DRAWER_WIDTH = 256

const navItems = [
  { icon: <DashboardIcon fontSize="small" />, label: 'Dashboard', to: '/' },
  { icon: <SchoolIcon fontSize="small" />,    label: 'Practice',  to: '/practice' },
  { icon: <ArticleIcon fontSize="small" />,   label: 'Mock Exams',to: '/exam' },
  { icon: <ShowChartIcon fontSize="small" />, label: 'Analytics', to: '/analytics' },
  { icon: <SettingsIcon fontSize="small" />,  label: 'Settings',  to: '/settings' },
]

const quickItems = [
  { icon: <MenuBookIcon fontSize="small" />,    label: 'Reading',   to: '/practice/reading',   color: '#00bcd4' },
  { icon: <HeadphonesIcon fontSize="small" />,  label: 'Listening', to: '/practice/listening', color: '#7c4dff' },
  { icon: <MicIcon fontSize="small" />,         label: 'Speaking',  to: '/practice/speaking',  color: '#ff9800' },
  { icon: <EditIcon fontSize="small" />,        label: 'Writing',   to: '/practice/writing',   color: '#4caf50' },
]

function NavItem({ icon, label, to, color, onClose, isMobile }) {
  const location = useLocation()
  const active = location.pathname === to

  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        component={Link}
        to={to}
        onClick={isMobile ? onClose : undefined}
        sx={{
          borderRadius: 2,
          mx: 1,
          py: 1,
          transition: 'all 0.2s',
          background: active ? 'rgba(0,188,212,0.12)' : 'transparent',
          border: active ? '1px solid rgba(0,188,212,0.2)' : '1px solid transparent',
          '&:hover': {
            background: active ? 'rgba(0,188,212,0.15)' : 'rgba(255,255,255,0.05)',
          },
        }}
      >
        <ListItemIcon sx={{
          minWidth: 34,
          color: active ? (color || '#00bcd4') : 'rgba(255,255,255,0.4)',
          transition: 'color 0.2s',
        }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: active ? 600 : 400,
            color: active ? '#fff' : 'rgba(255,255,255,0.55)',
          }}
        />
        {active && (
          <Box sx={{
            width: 3, height: 18, borderRadius: 2,
            background: color || 'linear-gradient(180deg, #00bcd4, #5c6bc0)',
          }} />
        )}
      </ListItemButton>
    </ListItem>
  )
}

function DrawerContent({ onClose, isMobile }) {
  return (
    <Box sx={{ overflow: 'auto', pt: 2, pb: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box sx={{ px: 3, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{
          width: 32, height: 32, borderRadius: 1.5,
          background: 'linear-gradient(135deg, #00bcd4, #5c6bc0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 15, color: '#fff', flexShrink: 0,
        }}>T</Box>
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>TOEFL iBT</Typography>
          <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>2026 PREP</Typography>
        </Box>
      </Box>

      <Typography sx={{ px: 3, mb: 1, fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
        Navigation
      </Typography>
      <List dense disablePadding>
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} onClose={onClose} isMobile={isMobile} />
        ))}
      </List>

      <Box sx={{ px: 2, my: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />
      </Box>

      <Typography sx={{ px: 3, mb: 1, fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
        Practice
      </Typography>
      <List dense disablePadding>
        {quickItems.map((item) => (
          <NavItem key={item.to} {...item} onClose={onClose} isMobile={isMobile} />
        ))}
      </List>

      {/* Bottom spacer */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2 }}>
        <Box sx={{
          p: 2, borderRadius: 2,
          background: 'rgba(0,188,212,0.06)',
          border: '1px solid rgba(0,188,212,0.12)',
        }}>
          <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#00bcd4', mb: 0.5 }}>2026 Format</Typography>
          <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
            Reading · Listening · Writing · Speaking
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

function RequireAuth({ children }) {
  const { user, loading } = useAuthStore()
  const location = useLocation()
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />
  return children
}

export default function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, loading, init, signOut } = useAuthStore()
  const hydrate = useProgressStore((s) => s.hydrate)

  useEffect(() => { init() }, []) // eslint-disable-line
  useEffect(() => {
    if (!loading) hydrate(user?.id ?? null)
  }, [user?.id, loading]) // eslint-disable-line

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  const isAuthPage = !user

  const drawerSx = {
    '& .MuiDrawer-paper': {
      width: DRAWER_WIDTH,
      boxSizing: 'border-box',
      background: '#0d1021',
      borderRight: '1px solid rgba(255,255,255,0.06)',
    },
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar — hidden on auth page */}
      <AppBar sx={{ display: isAuthPage ? 'none' : undefined }}
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          background: 'rgba(8,11,20,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Toolbar sx={{ minHeight: '60px !important' }}>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
              <Box sx={{
                width: 26, height: 26, borderRadius: 1,
                background: 'linear-gradient(135deg, #00bcd4, #5c6bc0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 13, color: '#fff',
              }}>T</Box>
              <Typography sx={{ fontSize: 14, fontWeight: 700 }}>TOEFL 2026</Typography>
            </Box>
          )}
          {!isMobile && <Box sx={{ flexGrow: 1 }} />}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                display: { xs: 'none', sm: 'flex' }, alignItems: 'center',
                px: 1.5, py: 0.5, borderRadius: 5,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <Box sx={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00bcd4, #5c6bc0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: '#fff', mr: 1,
                }}>
                  {user.email?.[0]?.toUpperCase()}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.email}
                </Typography>
              </Box>
              <Tooltip title="Sign Out">
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={signOut}
                  sx={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    '&:hover': { background: 'rgba(255,100,100,0.12)', borderColor: 'rgba(255,100,100,0.3)' },
                  }}
                >
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Permanent drawer (desktop) — hidden on auth page */}
      {!isMobile && !isAuthPage && (
        <Drawer
          variant="permanent"
          sx={{ width: DRAWER_WIDTH, flexShrink: 0, ...drawerSx, '& .MuiDrawer-paper': { ...drawerSx['& .MuiDrawer-paper'], top: '60px', height: 'calc(100% - 60px)' } }}
        >
          <DrawerContent isMobile={false} />
        </Drawer>
      )}

      {/* Temporary drawer (mobile) — hidden on auth page */}
      {isMobile && !isAuthPage && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ ...drawerSx, '& .MuiDrawer-paper': { ...drawerSx['& .MuiDrawer-paper'], width: DRAWER_WIDTH } }}
        >
          <Toolbar sx={{ minHeight: '60px !important' }} />
          <DrawerContent isMobile onClose={() => setMobileOpen(false)} />
        </Drawer>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: isAuthPage ? 0 : { xs: 2, sm: 3 },
          mt: isAuthPage ? 0 : '60px',
          ml: isAuthPage ? 0 : (isMobile ? 0 : `${DRAWER_WIDTH}px`),
          minHeight: '100vh',
          maxWidth: '100%',
          background: 'linear-gradient(135deg, #080b14 0%, #0d1021 100%)',
        }}
      >
        <ErrorBoundary>
          <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
              <CircularProgress />
            </Box>
          }>
            <Routes>
              <Route path="/auth" element={<AuthView />} />
              <Route path="/"                    element={<RequireAuth><DashboardView /></RequireAuth>} />
              <Route path="/practice"            element={<RequireAuth><PracticeHubView /></RequireAuth>} />
              <Route path="/practice/reading"    element={<RequireAuth><ReadingPracticeView /></RequireAuth>} />
              <Route path="/practice/listening"  element={<RequireAuth><ListeningPracticeView /></RequireAuth>} />
              <Route path="/practice/speaking"   element={<RequireAuth><SpeakingPracticeView /></RequireAuth>} />
              <Route path="/practice/writing"    element={<RequireAuth><WritingPracticeView /></RequireAuth>} />
              <Route path="/exam"                element={<RequireAuth><ExamHubView /></RequireAuth>} />
              <Route path="/exam/:id/start"      element={<RequireAuth><ExamStartView /></RequireAuth>} />
              <Route path="/exam/:id/review"     element={<RequireAuth><ExamReviewView /></RequireAuth>} />
              <Route path="/analytics"           element={<RequireAuth><AnalyticsView /></RequireAuth>} />
              <Route path="/settings"            element={<RequireAuth><SettingsView /></RequireAuth>} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Box>
  )
}
