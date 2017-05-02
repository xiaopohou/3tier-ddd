﻿using RefactorName.Core;
using RefactorName.GraphDiff;
using RefactorName.RepositoryInterface;
using RefactorName.RepositoryInterface.Queries;
using RefactorName.SqlServerRepository.Queries;
using System;
using System.Linq;

namespace RefactorName.SqlServerRepository
{
    public class GenericQueryRepository : IGenericQueryRepository
    {
        private MyDbContext notifierContext;

        public GenericQueryRepository() { }

        public GenericQueryRepository(MyDbContext context)
        {
            this.notifierContext = context;
        }

        #region IGenericQueryRepository Members

        public TEntity Single<TEntity>(int id)
            where TEntity : class
        {
            try
            {
                MyDbContext context = notifierContext ?? new MyDbContext();

                TEntity result = context.Set<TEntity>().Find(id);

                if (notifierContext == null)
                    context.Dispose();
                // else the management of the context is being done by the UnitOfWork

                return result;
            }
            catch (Exception ex)
            {
                throw ThrowHelper.ReThrow(ex);
            }
        }

        /// <summary>
        /// Returns single BusinessObject of table that satisfies a specified condition or a null if no such element is found.
        /// </summary>
        /// <typeparam name="TEntity">The type of BusinessObject of source table.</typeparam>
        /// <param name="predicate">A function to test each element for a condition.</param>
        /// <returns>The BusinessObject the satisfy the predicate.</returns>
        public TEntity Single<TEntity>(IQueryConstraints<TEntity> constraints)
            where TEntity : class
        {
            try
            {
                MyDbContext context = notifierContext ?? new MyDbContext();

                TEntity result = context.LoadAggregate(constraints.Predicate);

                if (notifierContext == null)
                    context.Dispose();
                // else the management of the context is being done by the UnitOfWork

                return result;
            }
            catch (Exception ex)
            {
                throw ThrowHelper.ReThrow(ex);
            }
        }

        public TEntity SingleOrDefault<TEntity>(IQueryConstraints<TEntity> constraints)
            where TEntity : class
        {

            try
            {
                MyDbContext context = notifierContext ?? new MyDbContext();

                TEntity result = context.Set<TEntity>()
                    .ToSearchResult<TEntity>(constraints)
                    .Items
                    .FirstOrDefault();

                if (notifierContext == null)
                    context.Dispose();
                // else the management of the context is being done by the UnitOfWork

                return result;
            }
            catch (Exception ex)
            {
                throw ThrowHelper.ReThrow(ex);
            }
        }

        /// <summary>
        /// Returns the number of elements in a BusinessObject's table.
        /// </summary>
        /// <typeparam name="T">The type of BusinessObject of source table.</typeparam>
        /// <returns>The number of elements in the input sequence.</returns>
        public int GetCount<T>()
            where T : class
        {
            try
            {
                MyDbContext context = notifierContext ?? new MyDbContext();

                int result = context.Set<T>().Count();

                if (notifierContext == null)
                    context.Dispose();
                // else the management of the context is being done by the UnitOfWork

                return result;
            }
            catch (Exception ex)
            {
                throw ThrowHelper.ReThrow(ex);
            }
        }

        /// <summary>
        /// Returns the number of elements of the specified T BusinessEntity that satisfies a condition.
        /// </summary>
        /// <typeparam name="TEntity">The type of BusinessObject of source table.</typeparam>
        /// <param name="predicate">A function to test each element for a condition.</param>
        /// <returns>The number of elements in the sequence that satisfies the condition in the predicate function.</returns>
        public int GetCount<TEntity>(IQueryConstraints<TEntity> constraints)
            where TEntity : class
        {
            try
            {
                MyDbContext context = notifierContext ?? new MyDbContext();

                int result = context.Set<TEntity>().Count(constraints.Predicate);

                if (notifierContext == null)
                    context.Dispose();
                // else the management of the context is being done by the UnitOfWork

                return result;
            }
            catch (Exception ex)
            {
                throw ThrowHelper.ReThrow(ex);
            }
        }

        public IQueryResult<TEntity> Find<TEntity>(IQueryConstraints<TEntity> constraints)
            where TEntity : class
        {
            MyDbContext context = notifierContext ?? new MyDbContext();

            var result = context.Set<TEntity>().ToSearchResult<TEntity>(constraints);

            if (notifierContext == null)
                context.Dispose();
            // else           the management of the context is being done by the UnitOfWork.

            return result;
        }

        #endregion

    }
}