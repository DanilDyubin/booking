import PropertyItem from '../components/property-item/PropertyItem';
import PropertyList from '../components/layout/property-list/PropertyList';

const SearchPage = () => {
  return (
    <>
      <div className="container" style={{ paddingTop: '20px' }}>
        <PropertyList />
      </div>
      {/* <PropertyItem /> */}
    </>
  );
};

export default SearchPage;
