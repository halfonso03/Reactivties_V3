import { Grid2 } from '@mui/material';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';

export default function ActivityDashboard() {

  //   function handleScroll() {

  //     // Code to execute when the page is scrolled
  //     const scrollY = window.scrollY;

  //     // Get the total height of the document (including scrollable content)
  //     const documentHeight = document.documentElement.scrollHeight;

  //     // Get the height of the visible viewport
  //     const viewportHeight = window.innerHeight;

  //     console.log(
  //       'scrollY + viewportHeight >= documentHeight',
  //       scrollY,
  //       viewportHeight,
  //       documentHeight
  //     );
  //     if (scrollY + viewportHeight >= documentHeight) {
  //       fetchNextPage();
  //     }
  //   }

  //   useEffect(() => {
  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   });

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <ActivityList />
      </Grid2>
      <Grid2
        size={4}
        sx={{ position: 'sticky', top: 112, alignSelf: 'flex-start' }}
      >
        <ActivityFilters />
      </Grid2>
    </Grid2>
  );
}
