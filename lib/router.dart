import 'package:amazon/common/widgets/bottom_bar.dart';
import 'package:amazon/features/admin/screen/add_product_screen.dart';
import 'package:amazon/features/home/screens/category_deals_screen.dart';
import 'package:amazon/features/home/screens/home_screen.dart';
import 'package:amazon/features/product_details/screens/product_details_screen.dart';
import 'package:amazon/features/search/screen/search_screen.dart';
import 'package:amazon/models/product.dart';
import 'package:flutter/material.dart';
import 'features/auth/screens/auth_screen.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    //Route pag autenticação de usuário/login
    case AuthScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const AuthScreen(),
      );
    //Route pag inicial
    case HomeScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const HomeScreen(),
      );
    //Route bottom bar
    case BottomBar.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const BottomBar(),
      );
    //Route adicionar produtos admin
    case AddProductScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const AddProductScreen(),
      );
    //Route categories
    case CategoryDealsScreen.routeName:
      var category = routeSettings.arguments as String;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => CategoryDealsScreen(
          category: category,
        ),
      );
    //Route pesquisar produtos
    case SearchScreen.routeName:
      var searchQuery = routeSettings.arguments as String;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => SearchScreen(
          searchQuery: searchQuery,
        ),
      );
    //Route detalhes do produto
    case ProductDetailsScreen.routeName:
      var product = routeSettings.arguments as Product;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => ProductDetailsScreen(
          product: product,
        ),
      );
    //Route pag não existe
    default:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const Scaffold(
          body: Center(
            child: Text("Screen does not exist!"),
          ),
        ),
      );
  }
}
