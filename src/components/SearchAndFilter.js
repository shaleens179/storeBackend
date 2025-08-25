import React, { useState, useEffect, useCallback } from 'react';
import {
  Paper,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  Collapse,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Sort as SortIcon,
  Tune as TuneIcon,
  ExpandMore as ExpandMoreIcon,
  Category as CategoryIcon,
  AttachMoney as PriceIcon,
  Inventory as StockIcon
} from '@mui/icons-material';

const SearchAndFilter = ({ filters, onFiltersChange, onSearch }) => {
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/plants/categories/all');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback((searchTerm) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      const newFilters = { ...localFilters, search: searchTerm };
      setLocalFilters(newFilters);
      onFiltersChange(newFilters);
    }, 500); // 500ms delay
    
    setSearchTimeout(timeout);
  }, [localFilters, onFiltersChange, searchTimeout]);

  const handleFilterChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    
    // For search field, use debounced search
    if (field === 'search') {
      debouncedSearch(value);
    } else {
      onFiltersChange(newFilters);
    }
  };

  const handleSearch = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const clearedFilters = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      inStock: '',
      sortBy: 'name',
      sortOrder: 'asc'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = () => {
    return Object.values(localFilters).some(value => 
      value !== '' && value !== 'name' && value !== 'asc'
    );
  };

  return (
    <Fade in timeout={800}>
      <Box>
        {/* Main Search Bar */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 4 }, 
            mb: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 50%, #ec4899 100%)',
            }
          }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SearchIcon sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Find Your Perfect Plant
              </Typography>
            </Box>
            
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              color="primary"
              size="large"
              sx={{ 
                display: { xs: 'flex', md: 'none' },
                bgcolor: 'primary.light',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.main',
                }
              }}
            >
              <TuneIcon />
            </IconButton>
            
            {hasActiveFilters() && (
              <Zoom in>
                <Chip
                  label="Filters Active"
                  color="primary"
                  size="medium"
                  variant="filled"
                  sx={{ 
                    fontWeight: 600,
                    bgcolor: 'primary.main',
                    color: 'white'
                  }}
                />
              </Zoom>
            )}
          </Box>

          {/* Search Bar */}
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search plants by name, category, or description..."
                value={localFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 2, color: 'primary.main' }} />,
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  sx={{ 
                    flexGrow: 1,
                    borderRadius: 3,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  Search
                </Button>
                {hasActiveFilters() && (
                  <Button
                    variant="outlined"
                    onClick={handleClearFilters}
                    startIcon={<ClearIcon />}
                    size={isMobile ? "medium" : "large"}
                    sx={{ 
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    {isMobile ? "Clear" : "Clear All"}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Advanced Filters */}
        <Collapse in={showFilters || !isMobile} timeout={400}>
          <Paper
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <Accordion 
              expanded={true} 
              sx={{ 
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '& .MuiAccordionSummary-root': {
                  bgcolor: 'rgba(99, 102, 241, 0.05)',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  '& .MuiAccordionSummary-content': {
                    margin: '16px 0',
                  }
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TuneIcon sx={{ color: 'white', fontSize: 16 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Advanced Filters
                  </Typography>
                </Box>
              </AccordionSummary>
              
              <AccordionDetails sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  {/* Category Filter */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <CategoryIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          Category
                        </Typography>
                      </Box>
                      <FormControl fullWidth>
                        <Select
                          value={localFilters.category}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          displayEmpty
                          sx={{
                            borderRadius: 3,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'divider',
                            },
                          }}
                        >
                          <MenuItem value="">
                            <Typography color="text.secondary">All Categories</Typography>
                          </MenuItem>
                          {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  {/* Price Range */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <PriceIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          Price Range
                        </Typography>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            placeholder="Min Price"
                            type="number"
                            value={localFilters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            InputProps={{
                              startAdornment: '₹',
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            placeholder="Max Price"
                            type="number"
                            value={localFilters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            InputProps={{
                              startAdornment: '₹',
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  {/* Stock Status */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <StockIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          Stock Status
                        </Typography>
                      </Box>
                      <FormControl fullWidth>
                        <Select
                          value={localFilters.inStock}
                          onChange={(e) => handleFilterChange('inStock', e.target.value)}
                          displayEmpty
                          sx={{
                            borderRadius: 3,
                          }}
                        >
                          <MenuItem value="">
                            <Typography color="text.secondary">All Stock Status</Typography>
                          </MenuItem>
                          <MenuItem value="true">In Stock</MenuItem>
                          <MenuItem value="false">Out of Stock</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  {/* Sort Options */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <SortIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          Sort Options
                        </Typography>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <FormControl fullWidth>
                            <Select
                              value={localFilters.sortBy || 'name'}
                              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                              sx={{
                                borderRadius: 3,
                              }}
                            >
                              <MenuItem value="name">Name</MenuItem>
                              <MenuItem value="price">Price</MenuItem>
                              <MenuItem value="stock">Stock</MenuItem>
                              <MenuItem value="createdAt">Date Added</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl fullWidth>
                            <Select
                              value={localFilters.sortOrder || 'asc'}
                              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                              sx={{
                                borderRadius: 3,
                              }}
                            >
                              <MenuItem value="asc">A-Z</MenuItem>
                              <MenuItem value="desc">Z-A</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Collapse>

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <Fade in timeout={600}>
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: 3,
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                border: '1px solid',
                borderColor: 'primary.light',
                borderRadius: 4,
              }}
            >
              <Typography variant="subtitle1" color="primary.main" gutterBottom sx={{ fontWeight: 600 }}>
                Active Filters:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {localFilters.search && (
                  <Chip
                    label={`Search: "${localFilters.search}"`}
                    onDelete={() => handleFilterChange('search', '')}
                    size="medium"
                    color="primary"
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                )}
                {localFilters.category && (
                  <Chip
                    label={`Category: ${localFilters.category}`}
                    onDelete={() => handleFilterChange('category', '')}
                    size="medium"
                    color="primary"
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                )}
                {localFilters.minPrice && (
                  <Chip
                    label={`Min Price: ₹${localFilters.minPrice}`}
                    onDelete={() => handleFilterChange('minPrice', '')}
                    size="medium"
                    color="primary"
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                )}
                {localFilters.maxPrice && (
                  <Chip
                    label={`Max Price: ₹${localFilters.maxPrice}`}
                    onDelete={() => handleFilterChange('maxPrice', '')}
                    size="medium"
                    color="primary"
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                )}
                {localFilters.inStock && (
                  <Chip
                    label={`Stock: ${localFilters.inStock === 'true' ? 'In Stock' : 'Out of Stock'}`}
                    onDelete={() => handleFilterChange('inStock', '')}
                    size="medium"
                    color="primary"
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                )}
                {localFilters.sortBy && localFilters.sortBy !== 'name' && (
                  <Chip
                    label={`Sort: ${localFilters.sortBy} (${localFilters.sortOrder === 'asc' ? 'A-Z' : 'Z-A'})`}
                    onDelete={() => {
                      handleFilterChange('sortBy', 'name');
                      handleFilterChange('sortOrder', 'asc');
                    }}
                    size="medium"
                    color="primary"
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                )}
              </Box>
            </Paper>
          </Fade>
        )}
      </Box>
    </Fade>
  );
};

export default SearchAndFilter;
