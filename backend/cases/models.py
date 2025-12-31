from django.db import models


class Case(models.Model):
    customer_id = models.CharField(max_length=20)
    outstanding_amount = models.FloatField()
    overdue_days = models.IntegerField()
    assigned_dca = models.CharField(max_length=50)
    recovery_prediction = models.CharField(max_length=10)
    status = models.CharField(max_length=20)

    RECOVERY_CHOICES = [
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ]

    # ML prediction (filled by model)
    recovery_prediction = models.CharField(
        max_length=10,
        choices=RECOVERY_CHOICES,
        blank=True,
        null=True
    )

    # ML confidence score (NEW)
    recovery_probability = models.FloatField(
        blank=True,
        null=True
    )

    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('In Progress', 'In Progress'),
        ('Escalated', 'Escalated'),
        ('Closed', 'Closed'),
    ]

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES
    )

    def __str__(self):
        return self.customer_id
    

