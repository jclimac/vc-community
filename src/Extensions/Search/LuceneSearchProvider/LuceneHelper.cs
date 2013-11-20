﻿namespace VirtoCommerce.Search.Providers.Lucene
{
    #region
    using System;
    using global::Lucene.Net.Documents;
    using VirtoCommerce.Foundation.Search;
    #endregion

    public class LuceneHelper
    {
        #region Public Methods and Operators

        /// <summary>
        ///     Converts the search document to lucene document
        /// </summary>
        /// <param name="document">The document.</param>
        /// <returns></returns>
        public static Document ConvertDocument(IDocument document)
        {
            var doc = new Document();
            for (var index = 0; index < document.FieldCount; index++)
            {
                var field = document[index];
                AddFieldToDocument(ref doc, field);
            }

            return doc;
        }

        #endregion

        #region Methods

        /// <summary>
        ///     Adds the field to the lucene document.
        /// </summary>
        /// <param name="doc">The doc.</param>
        /// <param name="field">The field.</param>
        private static void AddFieldToDocument(ref Document doc, IDocumentField field)
        {
            if (field == null)
            {
                return;
            }

            var store = Field.Store.YES;
            var index = Field.Index.NOT_ANALYZED;

            if (field.ContainsAttribute(value: IndexStore.NO))
            {
                store = Field.Store.NO;
            }

            if (field.ContainsAttribute(IndexType.ANALYZED))
            {
                index = Field.Index.ANALYZED;
            }
            else if (field.ContainsAttribute(IndexType.NO))
            {
                index = Field.Index.NO;
            }

            if (field.Value == null)
            {
                return;
            }

            field.Name = field.Name.ToLower();
            if (field.Name == "__key")
            {
                foreach (var val in field.Values)
                {
                    doc.Add(new Field(field.Name, val.ToString(), store, index));
                }
            }
            else if (field.Value is string)
            {
                foreach (var val in field.Values)
                {
                    doc.Add(new Field(field.Name, val.ToString(), store, index));
                    doc.Add(new Field("_content", val.ToString(), Field.Store.NO, Field.Index.ANALYZED));
                }
            }
            else if (field.Value is decimal) // parse prices
            {
                foreach (var val in field.Values)
                {
                    doc.Add(new Field(field.Name, LuceneQueryHelper.ConvertDecimalToSortable((decimal)val), store, index));
                }
            }
            else if (field.Value is DateTime) // parse dates
            {
                foreach (var val in field.Values)
                {
                    doc.Add(
                        new Field(
                            field.Name, DateTools.DateToString((DateTime)val, DateTools.Resolution.SECOND), store, index));
                }
            }
            else // try detecting the type
            {
                decimal t = 0;
                if (Decimal.TryParse(field.Value.ToString(), out t))
                {
                    foreach (var val in field.Values)
                    {
                        doc.Add(
                            new Field(field.Name, LuceneQueryHelper.ConvertDecimalToSortable(Decimal.Parse(val.ToString())), store, index));
                    }
                }
                else
                {
                    foreach (var val in field.Values)
                    {
                        doc.Add(new Field(field.Name, val.ToString(), store, index));
                    }
                }
            }
        }
        #endregion
    }
}