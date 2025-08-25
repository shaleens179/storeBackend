import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Box,
  Chip,
  OutlinedInput,
  FormHelperText,
  Typography,
  Alert,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  Add as AddIcon, 
  Close as CloseIcon, 
  LocalFlorist as PlantIcon,
  PhotoCamera as ImageIcon,
  Category as CategoryIcon,
  AttachMoney as PriceIcon,
  Inventory as StockIcon,
  Description as DescIcon,
  Spa as CareIcon,
  Straighten as SizeIcon
} from '@mui/icons-material';

const AddPlantForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categories: [],
    stock: '',
    image: '',
    description: '',
    careLevel: 'Easy',
    size: 'Medium'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const categories = [
    'Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Home Decor',
    'Flowering', 'Foliage', 'Herb', 'Cactus', 'Tropical', 'Low Maintenance',
    'Trailing', 'Aromatic', 'Medicinal', 'Culinary', 'Ground Cover',
    'Drought Tolerant', 'Good Luck', 'Pet Friendly', 'Statement Plant', 'Artistic', 'Low Light', 'Garden', 'Shade Loving', 'Tree', 'Mediterranean'
  ];

  const careLevels = ['Easy', 'Medium', 'Hard'];
  const sizes = ['Small', 'Medium', 'Large'];

  const steps = ['Basic Information', 'Categories & Details', 'Image & Description'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Plant name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Plant name cannot exceed 100 characters';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (formData.categories.length === 0) {
      newErrors.categories = 'At least one category is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }

    if (formData.stock && (isNaN(formData.stock) || parseInt(formData.stock) < 0)) {
      newErrors.stock = 'Stock must be a positive number';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const plantData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: formData.stock ? parseInt(formData.stock) : 0
      };

      await onSubmit(plantData);
      handleClose();
    } catch (error) {
      console.error('Error adding plant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      price: '',
      categories: [],
      stock: '',
      image: '',
      description: '',
      careLevel: 'Easy',
      size: 'Medium'
    });
    setErrors({});
    setLoading(false);
    setActiveStep(0);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, categories: typeof value === 'string' ? value.split(',') : value }));
    if (errors.categories) {
      setErrors(prev => ({ ...prev, categories: '' }));
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PlantIcon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Basic Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enter the essential details about your plant
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Plant Name *"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
                placeholder="e.g., Monstera Deliciosa"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price (₹) *"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                error={!!errors.price}
                helperText={errors.price}
                InputProps={{
                  startAdornment: <PriceIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                required
                placeholder="299"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                error={!!errors.stock}
                helperText={errors.stock || 'Leave empty for 0'}
                InputProps={{
                  startAdornment: <StockIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  inputProps: { min: 0 }
                }}
                placeholder="45"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Size</InputLabel>
                <Select
                  value={formData.size}
                  label="Size"
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  startAdornment={<SizeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  {sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CategoryIcon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Categories & Care
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Select categories and care requirements
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.categories}>
                <InputLabel>Categories *</InputLabel>
                <Select
                  multiple
                  value={formData.categories}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput label="Categories *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip 
                          key={value} 
                          label={value} 
                          size="small" 
                          sx={{ 
                            bgcolor: 'primary.main',
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  required
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.categories && (
                  <FormHelperText>{errors.categories}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Care Level</InputLabel>
                <Select
                  value={formData.careLevel}
                  label="Care Level"
                  onChange={(e) => handleInputChange('careLevel', e.target.value)}
                  startAdornment={<CareIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  {careLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Care Level Guide:
                </Typography>
                <Box>
                  <Chip label="Easy" size="small" sx={{ bgcolor: '#10b981', color: 'white', mr: 1, mb: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Perfect for beginners
                  </Typography>
                </Box>
                <Box>
                  <Chip label="Medium" size="small" sx={{ bgcolor: '#f59e0b', color: 'white', mr: 1, mb: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Some experience needed
                  </Typography>
                </Box>
                <Box>
                  <Chip label="Hard" size="small" sx={{ bgcolor: '#ef4444', color: 'white', mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    For experienced gardeners
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ImageIcon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Image & Description
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add an image and describe your plant
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL *"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                error={!!errors.image}
                helperText={errors.image || 'Enter a valid image URL (e.g., https://images.unsplash.com/...)'}
                required
                placeholder="https://images.unsplash.com/photo-..."
                InputProps={{
                  startAdornment: <ImageIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                error={!!errors.description}
                helperText={errors.description || `${formData.description.length}/500 characters`}
                inputProps={{ maxLength: 500 }}
                placeholder="Describe your plant's features, care requirements, and benefits..."
                InputProps={{
                  startAdornment: <DescIcon sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Preview */}
            {formData.image && (
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'background.paper'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Image Preview:
                  </Typography>
                  <Box
                    component="img"
                    src={formData.image}
                    alt="Plant preview"
                    sx={{
                      width: '100%',
                      maxWidth: 300,
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: '2px solid',
                      borderColor: 'divider',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
          maxHeight: '90vh',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PlantIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Add New Plant
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create a new plant listing for your store
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={handleClose} 
            size="large"
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.08)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3, pb: 0 }}>
          {/* Stepper */}
          <Box mb={4}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Fade in timeout={600}>
            <Box>
              {renderStepContent(activeStep)}
            </Box>
          </Fade>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={handleClose} 
            disabled={loading}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3
            }}
          >
            Cancel
          </Button>

          {activeStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3
              }}
            >
              Back
            </Button>
          )}

          {activeStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 4
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={loading}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.2
              }}
            >
              {loading ? 'Adding...' : 'Add Plant'}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPlantForm;
