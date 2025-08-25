import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Badge,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar
} from '@mui/material';
import {
  LocalOffer as PriceIcon,
  Inventory as StockIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as CartIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import PlantSkeleton from './PlantSkeleton';

const PlantList = ({ plants, loading, error, onRefresh, filters = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for functionality
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());
  const [quickViewPlant, setQuickViewPlant] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const getCategoryColor = (category) => {
    const colors = {
      'Indoor': '#10b981',
      'Outdoor': '#f59e0b',
      'Succulent': '#8b5cf6',
      'Air Purifying': '#3b82f6',
      'Home Decor': '#ec4899',
      'Flowering': '#ef4444',
      'Foliage': '#6b7280',
      'Herb': '#84cc16',
      'Cactus': '#10b981',
      'Tropical': '#f97316',
      'Low Maintenance': '#10b981',
      'Trailing': '#ec4899',
      'Aromatic': '#f59e0b',
      'Medicinal': '#ef4444',
      'Culinary': '#84cc16',
      'Ground Cover': '#6b7280',
      'Drought Tolerant': '#8b5cf6',
      'Good Luck': '#10b981',
      'Pet Friendly': '#3b82f6',
      'Statement Plant': '#f97316',
      'Artistic': '#ec4899',
      'Low Light': '#6b7280',
      'Garden': '#10b981',
      'Shade Loving': '#6b7280',
      'Tree': '#8b5cf6',
      'Mediterranean': '#f59e0b'
    };
    return colors[category] || '#6b7280';
  };

  const getStockStatus = (stock) => {
    if (stock > 20) return { label: 'In Stock', color: 'success', icon: '✅' };
    if (stock > 0) return { label: 'Low Stock', color: 'warning', icon: '⚠️' };
    return { label: 'Out of Stock', color: 'error', icon: '❌' };
  };

  const getCareLevelColor = (level) => {
    const colors = {
      'Easy': '#10b981',
      'Medium': '#f59e0b',
      'Hard': '#ef4444'
    };
    return colors[level] || '#6b7280';
  };

  const getCareLevelDescription = (level) => {
    const descriptions = {
      'Easy': 'Perfect for beginners! These plants are low-maintenance and forgiving.',
      'Medium': 'Moderate care required. Good for plant enthusiasts with some experience.',
      'Hard': 'Advanced care needed. Best for experienced plant parents.'
    };
    return descriptions[level] || 'Care level information not available.';
  };

  // Function handlers
  const handleFavorite = (plantId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(plantId)) {
      newFavorites.delete(plantId);
      setSnackbar({ open: true, message: '🌿 Removed from favorites', severity: 'info' });
    } else {
      newFavorites.add(plantId);
      setSnackbar({ open: true, message: '❤️ Added to favorites', severity: 'success' });
    }
    setFavorites(newFavorites);
  };

  const handleAddToCart = (plant) => {
    if (plant.stock === 0) {
      setSnackbar({ open: true, message: '❌ Plant is out of stock', severity: 'error' });
      return;
    }
    
    const newCart = new Set(cart);
    newCart.add(plant._id || plant.id);
    setCart(newCart);
    setSnackbar({ open: true, message: '🛒 Added to cart!', severity: 'success' });
  };

  const handleQuickView = (plant) => {
    setQuickViewPlant(plant);
  };

  const handleCloseQuickView = () => {
    setQuickViewPlant(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" gap={3}>
        <Box position="relative">
          <CircularProgress size={80} thickness={4} />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: 'translate(-50%, -50%)' }}
          >
            <Typography variant="h4">🌿</Typography>
          </Box>
        </Box>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          Loading your green paradise...
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Discovering beautiful plants for you
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={3} minHeight="400px">
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          <Typography variant="h2" color="error.main">🌱</Typography>
        </Box>
        <Alert severity="error" sx={{ maxWidth: 600, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Unable to load plants
          </Typography>
          <Typography variant="body2">
            {error}
          </Typography>
        </Alert>
        <Button
          variant="contained"
          size="large"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
          sx={{ 
            borderRadius: 3,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  if (plants.length === 0) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={3} minHeight="400px">
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          <Typography variant="h2" color="primary.main">🌿</Typography>
        </Box>
        <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 600, textAlign: 'center' }}>
          No plants found
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 500 }}>
          {filters.search || filters.category || filters.minPrice || filters.maxPrice || filters.inStock
            ? "Try adjusting your search or filter criteria to find what you're looking for"
            : "No plants are currently available in our store. Check back soon for new arrivals!"
          }
        </Typography>
        {(filters.search || filters.category || filters.minPrice || filters.maxPrice || filters.inStock) && (
          <Button
            variant="outlined"
            size="large"
            onClick={onRefresh}
            startIcon={<RefreshIcon />}
            sx={{ 
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Clear Filters
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
            {plants.length} plant{plants.length !== 1 ? 's' : ''} found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discover your perfect green companion
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="medium"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Refresh
        </Button>
      </Box>

      {/* Fixed Grid Layout with Center Alignment */}
      <Grid 
        container 
        spacing={3}
        justifyContent="center"
        sx={{
          // Ensure consistent grid layout
          '& .MuiGrid-item': {
            display: 'flex',
            justifyContent: 'center',
          }
        }}
      >
        {plants.map((plant, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={plant._id || plant.id}
            sx={{
              // Fixed card dimensions
              width: '100%',
              maxWidth: { xs: '100%', sm: '320px', md: '280px', lg: '280px' },
              minHeight: 520,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              sx={{
                width: '100%',
                height: '100%',
                maxWidth: { xs: '100%', sm: '320px', md: '280px', lg: '280px' },
                minHeight: 520,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                '&:hover .plant-actions': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
              {/* Fixed Image Container */}
              <Box 
                position="relative" 
                sx={{ 
                  height: 240,
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  width="100%"
                  image={plant.image}
                  alt={plant.name}
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
                
                {/* Quick actions overlay */}
                <Box
                  className="plant-actions"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    opacity: 0,
                    transform: 'translateY(-10px)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Tooltip title={favorites.has(plant._id || plant.id) ? "Remove from favorites" : "Add to favorites"}>
                    <IconButton
                      size="small"
                      onClick={() => handleFavorite(plant._id || plant.id)}
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 1)',
                        }
                      }}
                    >
                      {favorites.has(plant._id || plant.id) ? (
                        <FavoriteIcon fontSize="small" sx={{ color: '#ec4899' }} />
                      ) : (
                        <FavoriteBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Quick view">
                    <IconButton
                      size="small"
                      onClick={() => handleQuickView(plant)}
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 1)',
                        }
                      }}
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Care level badge */}
                {plant.careLevel && (
                  <Tooltip title={getCareLevelDescription(plant.careLevel)}>
                    <Chip
                      label={plant.careLevel}
                      size="small"
                      icon={<InfoIcon sx={{ fontSize: '0.7rem' }} />}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: getCareLevelColor(plant.careLevel),
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        cursor: 'help',
                      }}
                    />
                  </Tooltip>
                )}
              </Box>
              
              <CardContent sx={{ flexGrow: 1, pb: 1, pt: 2, px: 2 }}>
                <Typography variant="h6" component="h3" gutterBottom noWrap sx={{ fontWeight: 600, mb: 1 }}>
                  {plant.name}
                </Typography>
                
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <PriceIcon color="primary" fontSize="small" />
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    ₹{plant.price}
                  </Typography>
                  {plant.originalPrice && plant.originalPrice > plant.price && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ₹{plant.originalPrice}
                    </Typography>
                  )}
                </Box>

                <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                  {plant.categories && plant.categories.slice(0, 2).map((category, index) => (
                    <Chip
                      key={index}
                      label={category}
                      size="small"
                      sx={{
                        backgroundColor: getCategoryColor(category),
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                  ))}
                  {plant.categories && plant.categories.length > 2 && (
                    <Chip
                      label={`+${plant.categories.length - 2}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  )}
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <StockIcon fontSize="small" color="action" />
                  <Chip
                    label={getStockStatus(plant.stock).label}
                    color={getStockStatus(plant.stock).color}
                    size="small"
                    variant="outlined"
                    icon={<span>{getStockStatus(plant.stock).icon}</span>}
                  />
                </Box>

                {plant.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.4,
                      mb: 1,
                    }}
                  >
                    {plant.description}
                  </Typography>
                )}
              </CardContent>

              <CardActions sx={{ pt: 0, pb: 2, px: 2, mt: 'auto' }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="medium"
                  startIcon={<CartIcon />}
                  disabled={plant.stock === 0}
                  onClick={() => handleAddToCart(plant)}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.2
                  }}
                >
                  {plant.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick View Dialog */}
      <Dialog
        open={!!quickViewPlant}
        onClose={handleCloseQuickView}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
          }
        }}
      >
        {quickViewPlant && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {quickViewPlant.name}
                </Typography>
                <IconButton onClick={handleCloseQuickView}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={quickViewPlant.image}
                    alt={quickViewPlant.name}
                    sx={{
                      width: '100%',
                      height: 300,
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                      ₹{quickViewPlant.price}
                    </Typography>
                    
                    <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                      {quickViewPlant.categories && quickViewPlant.categories.map((category, index) => (
                        <Chip
                          key={index}
                          label={category}
                          size="small"
                          sx={{
                            backgroundColor: getCategoryColor(category),
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Box>

                    {quickViewPlant.careLevel && (
                      <Box mb={2}>
                        <Tooltip title={getCareLevelDescription(quickViewPlant.careLevel)}>
                          <Chip
                            label={`Care Level: ${quickViewPlant.careLevel}`}
                            icon={<InfoIcon />}
                            sx={{
                              bgcolor: getCareLevelColor(quickViewPlant.careLevel),
                              color: 'white',
                              fontWeight: 600,
                              cursor: 'help',
                            }}
                          />
                        </Tooltip>
                      </Box>
                    )}

                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <StockIcon fontSize="small" color="action" />
                      <Chip
                        label={getStockStatus(quickViewPlant.stock).label}
                        color={getStockStatus(quickViewPlant.stock).color}
                        size="small"
                        variant="outlined"
                        icon={<span>{getStockStatus(quickViewPlant.stock).icon}</span>}
                      />
                    </Box>

                    {quickViewPlant.description && (
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {quickViewPlant.description}
                      </Typography>
                    )}

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={<CartIcon />}
                      disabled={quickViewPlant.stock === 0}
                      onClick={() => {
                        handleAddToCart(quickViewPlant);
                        handleCloseQuickView();
                      }}
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.5
                      }}
                    >
                      {quickViewPlant.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PlantList;
