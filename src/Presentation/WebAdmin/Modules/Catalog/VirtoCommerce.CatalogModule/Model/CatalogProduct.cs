﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace VirtoCommerce.CatalogModule.Model
{
	public class CatalogProduct
	{
		public string Id { get; set; }
		public string Code { get; set; }
		public string Name { get; set; }

		public string CatalogId { get; set; }
		public Catalog Catalog { get; set; }

		public string CategoryId { get; set; }
		public Category Category { get; set; }

		public string MainProductId { get; set; }
		public CatalogProduct MainProduct { get; set; }
	
		public ICollection<PropertyValue> PropertyValues { get; set; }
		public ICollection<ItemAsset> Assets { get; set; }
		public ICollection<CategoryLink> Links { get; set; }
		public ICollection<CatalogProduct> Variations { get; set; }
	}
}
