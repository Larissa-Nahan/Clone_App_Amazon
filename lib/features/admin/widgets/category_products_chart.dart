import 'package:amazon/features/admin/models/sales.dart';
import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;

class CategoryProductsCharts extends StatelessWidget {
  final List<charts.Series<Sales, String>> seriesList;
  const CategoryProductsCharts({
    super.key,
    required this.seriesList,
  });

  @override
  Widget build(BuildContext context) {
    return charts.BarChart(
      seriesList,
      animate: true,
    );
  }
}
