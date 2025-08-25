import React from 'react';
import {
  Box,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';

const PaginationComponent = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      flexWrap="wrap"
      gap={2}
      sx={{ 
        mt: 4, 
        p: 2, 
        backgroundColor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      {/* Items per page selector */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" color="text.secondary">
          Show:
        </Typography>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <Select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(e.target.value)}
            displayEmpty
          >
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={48}>48</MenuItem>
            <MenuItem value={96}>96</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          per page
        </Typography>
      </Box>

      {/* Results info */}
      <Typography variant="body2" color="text.secondary">
        Showing {startItem}-{endItem} of {totalItems} plants
      </Typography>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        color="primary"
        size={isMobile ? "small" : "medium"}
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            fontSize: isMobile ? '0.875rem' : '1rem',
          }
        }}
      />
    </Box>
  );
};

export default PaginationComponent;
