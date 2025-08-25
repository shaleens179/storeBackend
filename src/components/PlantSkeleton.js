import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Skeleton,
  Box
} from '@mui/material';

const PlantSkeleton = ({ count = 12 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Image skeleton */}
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ borderRadius: '8px 8px 0 0' }}
            />
            
            <CardContent sx={{ flexGrow: 1, pt: 2 }}>
              {/* Title skeleton */}
              <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
              
              {/* Price skeleton */}
              <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
              
              {/* Categories skeleton */}
              <Box display="flex" gap={1} mb={1}>
                <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
              </Box>
              
              {/* Stock skeleton */}
              <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
              
              {/* Description skeleton */}
              <Skeleton variant="text" width="100%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="70%" height={16} />
            </CardContent>
            
            {/* Action buttons skeleton */}
            <Box sx={{ p: 2, pt: 0 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlantSkeleton;
