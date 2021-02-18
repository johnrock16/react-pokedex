import React from 'react';

const Header = () => {
  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <span style={styles.title}>Pokedex</span>
      </div>
    </div>
  )
}

const styles = {
  container: { display: 'flex', backgroundColor: 'black', height: '15vh', width: '100%', borderBottom: 'solid', borderWidth: 0.5, flexDirection: 'row' },
  titleContainer: { display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  title: { fontSize: 24, color: 'white' }
}

export default Header;