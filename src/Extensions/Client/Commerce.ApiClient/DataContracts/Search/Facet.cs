﻿namespace VirtoCommerce.ApiClient.DataContracts.Search
{
    public class Facet
    {
        #region Public Properties
        public string FacetType { get; set; }

        public string Field { get; set; }

        public string Label { get; set; }

        public FacetValue[] Values { get; set; }
        #endregion
    }
}