-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

```
SELECT Product.ProductName,
    Category.CategoryName
FROM Product
JOIN Category
ON Product.CategoryId = Category.id;
```

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

```
SELECT [order].id,
    shipper.CompanyName,
    [order].OrderDate
FROM [Order]
JOIN shipper ON [order].ShipVia = shipper.Id
WHERE [order].OrderDate < '2012-08-09';
```

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

```
SELECT Product.ProductName,
    OrderDetail.Quantity
FROM OrderDetail
JOIN Product
ON OrderDetail.ProductId = Product.Id
WHERE OrderDetail.OrderId = '10251';
```

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

```
SELECT [order].id as 'Order ID',
    Customer.CompanyName as 'Company Name',
    Employee.LastName as 'Employee Last Name'
FROM [order]
JOIN Customer ON [order].CustomerId=Customer.Id
JOIN Employee ON [order].EmployeeId=Employee.Id;
```