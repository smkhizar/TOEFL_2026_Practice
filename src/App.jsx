import React, { lazy, Suspense, useEffect, useState, Component } from 'react'
import { Link, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import {
  AppBar, Box, Button, CircularProgress, Divider, Drawer, IconButton,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
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
  static getDerivedStateFromError(error) {
    return { error }
  }
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

const AuthView = lazy(() => import('./views/AuthView'))
const DashboardView = lazy(() => import('./views/DashboardView'))
const PracticeHubView = lazy(() => import('./views/PracticeHubView'))
const ExamHubView = lazy(() => import('./views/ExamHubView'))
const AnalyticsView = lazy(() => import('./views/AnalyticsView'))
const SettingsView = lazy(() => import('./views/SettingsView'))
const ReadingPracticeView = lazy(() => import('./views/practice/ReadingPracticeView'))
const ListeningPracticeView = lazy(() => import('./views/practice/ListeningPracticeView'))
const SpeakingPracticeView = lazy(() => import('./views/practice/SpeakingPracticeView'))
const WritingPracticeView = lazy(() => import('./views/practice/WritingPracticeView'))
const ExamStartView = lazy(() => import('./views/exam/ExamStartView'))
const ExamReviewView = lazy(() => import('./views/exam/ExamReviewView'))

const DRAWER_WIDTH = 260

const navItems = [
  { icon: <DashboardIcon />, label: 'Dashboard', to: '/' },
  { icon: <SchoolIcon />, label: 'Practice', to: '/practice' },
  { icon: <ArticleIcon />, label: 'Mock Exams', to: '/exam' },
  { icon: <ShowChartIcon />, label: 'Analytics', to: '/analytics' },
  { icon: <SettingsIcon />, label: 'Settings', to: '/settings' },
]
const quickItems = [
  { icon: <MenuBookIcon />, label: 'Reading', to: '/practice/reading' },
  { icon: <HeadphonesIcon />, label: 'Listening', to: '/practice/listening' },
  { icon: <MicIcon />, label: 'Speaking', to: '/practice/speaking' },
  { icon: <EditIcon />, label: 'Writing', to: '/practice/writing' },
]

function DrawerContent({ onClose, isMobile }) {
  const location = useLocation()
  return (
    <Box sx={{ overflow: 'auto', pt: 1 }}>
      <Typography variant="overline" sx={{ px: 2, color: 'text.secondary', display: 'block', mb: 1 }}>
        TOEFL 2026 Prep
      </Typography>
      <List dense>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
              onClick={isMobile ? onClose : undefined}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <Typography variant="overline" sx={{ px: 2, color: 'text.secondary', display: 'block', mb: 1 }}>
        Quick Sections
      </Typography>
      <List dense>
        {quickItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
              onClick={isMobile ? onClose : undefined}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return children
}

export default function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, loading, init, signOut } = useAuthStore()
  const hydrate = useProgressStore((s) => s.hydrate)

  useEffect(() => {
    init()
  }, []) // eslint-disable-line

  // Hydrate progress whenever user changes (login/logout)
  useEffect(() => {
    if (!loading) {
      hydrate(user?.id ?? null)
    }
  }, [user?.id, loading]) // eslint-disable-line

  // Show full-screen spinner while auth state is initializing
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'rgba(26,29,39,0.85)',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            TOEFL iBT 2026 — Practice Suite
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                {user.email}
              </Typography>
              <Tooltip title="Sign Out">
                <IconButton color="inherit" size="small" onClick={signOut}>
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Desktop permanent drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              top: '64px',
              height: 'calc(100% - 64px)',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          <DrawerContent isMobile={false} />
        </Drawer>
      )}

      {/* Mobile temporary drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
        >
          <Toolbar />
          <DrawerContent isMobile onClose={() => setMobileOpen(false)} />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: '64px',
          ml: isMobile ? 0 : `${DRAWER_WIDTH}px`,
          minHeight: 'calc(100vh - 64px)',
          maxWidth: '100%',
        }}
      >
        <ErrorBoundary>
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            {/* Public route */}
            <Route path="/auth" element={<AuthView />} />

            {/* Protected routes */}
            <Route path="/" element={<RequireAuth><DashboardView /></RequireAuth>} />
            <Route path="/practice" element={<RequireAuth><PracticeHubView /></RequireAuth>} />
            <Route path="/practice/reading" element={<RequireAuth><ReadingPracticeView /></RequireAuth>} />
            <Route path="/practice/listening" element={<RequireAuth><ListeningPracticeView /></RequireAuth>} />
            <Route path="/practice/speaking" element={<RequireAuth><SpeakingPracticeView /></RequireAuth>} />
            <Route path="/practice/writing" element={<RequireAuth><WritingPracticeView /></RequireAuth>} />
            <Route path="/exam" element={<RequireAuth><ExamHubView /></RequireAuth>} />
            <Route path="/exam/:id/start" element={<RequireAuth><ExamStartView /></RequireAuth>} />
            <Route path="/exam/:id/review" element={<RequireAuth><ExamReviewView /></RequireAuth>} />
            <Route path="/analytics" element={<RequireAuth><AnalyticsView /></RequireAuth>} />
            <Route path="/settings" element={<RequireAuth><SettingsView /></RequireAuth>} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </Box>
    </Box>
  )
}
