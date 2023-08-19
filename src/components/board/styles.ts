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
      columnGap: '20px',
      marginLeft: '20px',
    },
    col: {
      display: 'flex',
      height: '100%',
      width: '300px',
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
      border: '1px solid red',
    },
  }
}
