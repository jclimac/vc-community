﻿INSERT INTO [SystemJob] ([SystemJobId],[Name],[Description],[JobClassType],[IsEnabled],[Schedule],[Priority],[Period],[LastExecuted],[NextExecute],[AllowMultipleInstances],[LastModified],[Created],[Discriminator],[JobAssemblyPath],[LoadFromGac]) VALUES (N'813dea57-494e-434a-b4b4-6027e4d76f8f',N'Process Search Index',N'Process Search Index Work',N'VirtoCommerce.Scheduling.Jobs.ProcessSearchIndexWork, VirtoCommerce.Scheduling.Jobs',1,NULL,1,100,NULL,NULL,1,N'20130319 16:06:32.090',N'20130319 16:06:32.090',N'SystemJob',NULL,0);
INSERT INTO [SystemJob] ([SystemJobId],[Name],[Description],[JobClassType],[IsEnabled],[Schedule],[Priority],[Period],[LastExecuted],[NextExecute],[AllowMultipleInstances],[LastModified],[Created],[Discriminator],[JobAssemblyPath],[LoadFromGac]) VALUES (N'845537d0-b02b-417e-b96a-6507d4e48a38',N'OrderStatusUpdate',N'Order Status update after it was created in FrontEnd',N'VirtoCommerce.Scheduling.Jobs.ProcessOrderStatusWork, VirtoCommerce.Scheduling.Jobs',1,NULL,1,600,NULL,NULL,0,N'20130429 21:15:39.717',N'20130429 21:15:39.717',N'SystemJob',NULL,0);
INSERT INTO [SystemJob] ([SystemJobId],[Name],[Description],[JobClassType],[IsEnabled],[Schedule],[Priority],[Period],[LastExecuted],[NextExecute],[AllowMultipleInstances],[LastModified],[Created],[Discriminator],[JobAssemblyPath],[LoadFromGac]) VALUES (N'a7d5a1b7-2ec1-4190-8a9f-d4ac8079496d',N'Generate Search Index',N'Generate Search Index Work',N'VirtoCommerce.Scheduling.Jobs.GenerateSearchIndexWork, VirtoCommerce.Scheduling.Jobs',1,NULL,1,100,NULL,NULL,0,N'20130319 15:55:34.577',N'20130319 15:54:31.813',N'SystemJob',NULL,0);
INSERT INTO [SystemJob] ([SystemJobId],[Name],[Description],[JobClassType],[IsEnabled],[Schedule],[Priority],[Period],[LastExecuted],[NextExecute],[AllowMultipleInstances],[LastModified],[Created],[Discriminator],[JobAssemblyPath],[LoadFromGac]) VALUES (N'c0a4593f-1184-4545-85c8-3f7d355d0788',N'Remove expired promotion reservations',N'Removed expired promotion reservations from PromotionUsage table',N'VirtoCommerce.Scheduling.Jobs.RemoveExpiredPromotionReservations, VirtoCommerce.Scheduling.Jobs',1,NULL,1,100,NULL,NULL,0,N'20140207 12:13:51.780',N'20140207 12:13:44.300',N'SystemJob',NULL,0);
INSERT INTO [SystemJob] ([SystemJobId],[Name],[Description],[JobClassType],[IsEnabled],[Schedule],[Priority],[Period],[LastExecuted],[NextExecute],[AllowMultipleInstances],[LastModified],[Created],[Discriminator],[JobAssemblyPath],[LoadFromGac]) VALUES (N'fd005089-dd1b-4748-a661-77fd60c84b11',N'Update statistics',N'Update statistics displayed in dashboard',N'VirtoCommerce.Scheduling.Jobs.UpdateStatisticsWork, VirtoCommerce.Scheduling.Jobs',1,NULL,1,300,NULL,NULL,0,N'20140729 06:28:30.027',N'20140729 06:28:30.027',N'SystemJob',NULL,0);