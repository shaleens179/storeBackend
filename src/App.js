import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  Search as SearchIcon,
  LocalFlorist as PlantIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import PlantList from './components/PlantList';
import SearchAndFilter from './components/SearchAndFilter';
import AddPlantForm from './components/AddPlantForm';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    info: {
      main: '#3b82f6',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.025em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.025em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
          border: '1px solid #f3f4f6',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 16,
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '12px 24px',
          gap: '8px',
          fontSize: '0.875rem',
          letterSpacing: '0.025em',
        },
        contained: {
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.6)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
          border: '1px solid #f3f4f6',
          borderRadius: 16,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
          '&:hover': {
            boxShadow: '0 12px 35px rgba(99, 102, 241, 0.6)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.75rem',
          borderRadius: 8,
          letterSpacing: '0.025em',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '12px',
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6366f1',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6366f1',
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addPlantOpen, setAddPlantOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const themeInstance = useTheme();
  const isMobile = useMediaQuery(themeInstance.breakpoints.down('md'));

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.inStock) queryParams.append('inStock', filters.inStock);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);

      const response = await fetch(`https://plantstore-6qkd.onrender.com/api/plants?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch plants');
      
      const data = await response.json();
      setPlants(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [filters]);

  const handleAddPlant = async (plantData) => {
    try {
      const response = await fetch('https://plantstore-6qkd.onrender.com/api/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plantData),
      });

      if (!response.ok) throw new Error('Failed to add plant');

      const result = await response.json();
      setPlants([...plants, result.data]);
      setAddPlantOpen(false);
      setSnackbar({
        open: true,
        message: '🌿 Plant added successfully!',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: `❌ ${err.message}`,
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, action: () => setDrawerOpen(false) },
    { text: 'Categories', icon: <CategoryIcon />, action: () => setDrawerOpen(false) },
    { text: 'Search', icon: <SearchIcon />, action: () => setDrawerOpen(false) },
    { text: 'Cart', icon: <CartIcon />, action: () => setDrawerOpen(false) },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* App Bar */}
        <AppBar position="static" elevation={0}>
          <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1.5 }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <PlantIcon sx={{ mr: 2, fontSize: 28 }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                Urvann Plant Store
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
              🌱 Your Green Paradise
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 280,
              background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
            }
          }}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              🌿 Menu
            </Typography>
          </Box>
          <List sx={{ pt: 2 }}>
            {menuItems.map((item, index) => (
              <ListItem 
                button 
                key={index}
                onClick={item.action}
                sx={{
                  mx: 2,
                  mb: 1,
                  borderRadius: 3,
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: { xs: 3, md: 4 } }}>
          <Box textAlign="center" mb={4}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #ec4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Discover Your Perfect Plants
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Explore our curated collection of beautiful plants, from easy-care succulents to stunning statement pieces
            </Typography>
          </Box>

          {/* Search and Filter */}
          <SearchAndFilter
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={fetchPlants}
          />

          {/* Plant List */}
          <PlantList
            plants={plants}
            loading={loading}
            error={error}
            onRefresh={fetchPlants}
            filters={filters}
          />
        </Container>

        {/* Add Plant FAB */}
        <Fab
          color="primary"
          aria-label="add plant"
          sx={{ 
            position: 'fixed', 
            bottom: { xs: 16, md: 24 }, 
            right: { xs: 16, md: 24 },
            zIndex: 1000
          }}
          onClick={() => setAddPlantOpen(true)}
        >
          <AddIcon />
        </Fab>

        {/* Add Plant Dialog */}
        <AddPlantForm
          open={addPlantOpen}
          onClose={() => setAddPlantOpen(false)}
          onSubmit={handleAddPlant}
        />

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ 
              width: '100%',
              borderRadius: 3,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
