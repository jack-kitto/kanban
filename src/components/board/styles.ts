export const useStyles = () => {
  return {
    container: {
      height: '100%',
    },
    columns: {
      paddingTop: '25px',
      display: 'grid',
      height: '100%',
      gridAutoFlow: 'column',
      gridAutoColumns: '300px',
    },
    col(col: number) {
      return {
        display: 'grid',
        height: '100%',
        gridAutoFlow: 'row',
        gridAutoRows: '100px',
        gridTemplateRows: '50px 100px',
        gridColumnStart: col,
      }
    },
    addColumn: {
      gridAutoFlow: 'row',
      gridAutoRows: '100px',
      gridTemplateRows: '50px 100px',
      display: 'grid',
      height: '100%',
    },
    title: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    task: {
    },
  }
}
